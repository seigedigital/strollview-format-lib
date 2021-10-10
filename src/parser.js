import v1Parser from './version1.js'
import v2Parser from './version2.js'
import { Utils } from 'manifesto.js'

export default class svParser {

    // expects a parsed stroll
    constructor(uri) {

        this.status = {
            cursor: 0,
            pages: 0,
            errors: 0,
            status: 0,
            failed: false,
            done: false,
            version: 0,
            messages: []
        }
        this.uri = uri
        this.stroll = false
        this.data = {
            items: {},
            label:'',
            creator:'',
            rights:''
        }
        this.parser = false
    }

    addMessage(message,error,failed,done) {
        this.status.done = done
        this.status.failed = failed
        this.status.errors += error?1:0
        this.status.messages.push(message)
        console.log(message)
    }

    getVersion() {
        if(!this.stroll) {
            return
        }
        if(! '@context' in this.stroll) {
            return
        }
        let ctx = this.stroll['@context']
        if(!Array.isArray(this.stroll['@context'])) {
            ctx = [ctx]
        }
        if(ctx.includes('https://seige.digital/ns/iiif.jsonld')) {
            this.status.version = 1
        } else if(ctx.includes('https://seige.digital/strollview/2/context.jsonld')) {
            this.status.version = 2
        } else {
            this.status.version = 0
        }
    }

    fetchStroll() {
        return fetch(this.uri)
            .then(response => response.json())
            .then(data => {
                this.stroll = data
                this.getVersion()
                this.initParser()
            })
            .catch((error) => {
                this.addMessage("Couldn't fetch URI: "+this.uri,true,true,true)
            })
    }

    initParser() {
        switch(this.status.version) {
            case 1:
                this.addMessage("Version 1 format detected.",false,false,false)
                this.parser = new v1Parser()
                break
            case 2:
                this.addMessage("Version 2 format detected.",false,false,false)
                this.parser = new v2Parser()
                break
            default:
                this.addMessage("Unknown format.",true,true,true)
                return
        }
        this.status.pages = this.parser.getNumberOfPages(this.stroll)
        this.data.label = this.parser.getTitle(this.stroll)
        this.data.creator = this.parser.getCreator(this.stroll)
        this.data.rights = this.parser.getRights(this.stroll)
    }

    next() {
        if(this.status.cursor<this.status.pages) {
            let result = this.parser.getItem(this.stroll,this.status.cursor)
            this.status.errors += result.errors
            this.status.messages.concat(result.messages)
            this.data.items[this.status.cursor]=result.data
            this.data.items[this.status.cursor].n=this.status.cursor
            this.status.cursor++
            return result.data
        }
        return false
    }

    getCanvas(n) {
        let mid = this.data.items[n].manifest_id
        let cid = this.data.items[n].canvas_id
        return new Promise((resolve, reject) => {
            fetch(mid)
                .then(response => response.json())
                .then(data => {
                    let res = this.recursiveFindId(data,cid)
                    if(!res) {
                        this.addMessage("Canvas not found: "+cid,true,false,false)
                    }
                    this.data.items[n].canvas_bin = res
                    resolve(this.data.items[n])
                    // resolve(res)
                })
                .catch((error) => {
                    this.addMessage("Manifest not available: "+mid,true,false,false)
                    reject()
                })
        })
    }

    recursiveFindId(o,id) {
        for(let key in o) {
            if(typeof o[key] === 'object') {
                let r = this.recursiveFindId(o[key],id)
                if(r) {
                    return r
                }
            }
            if(key==='@id' && o[key]===id) {
                return o
            }
            if(key==='id' && o[key]===id) {
                return o
            }
        }
        return false
    }
}

// module.exports = svParser
