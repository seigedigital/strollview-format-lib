
class svParser {

    status = {
        pages: 0, // number of pages
        errors: 0, // number of errors
        status: 0, // status 0=OK
        failed: false, // failed or not
        version: 0,
        messages: []
    }
    uri = false
    stroll = false

    // expects a parsed stroll
    constructor(stroll) {
        if(typeof stroll !== 'object') {
            this.addMessage("Not a valid Stroll.",true,true)
            return
        }
        this.stroll = stroll
    }

    addMessage(message,error,failed) {
        this.status.failed = failed
        this.status.errors += error?1:0
        this.status.messages.push(message)
        console.log(message)
    }

    getVersion() {
        if(! '@context' in this.stroll) {
            addMessage("Unknown Format.",true,true)
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
            addMessage("Unknown Format.",true,true)
        }
    }

    // fetchStroll() {
    //     fetch(this.uri)
    //         .then(response => response.json())
    //         .then(data => {
    //             this.stroll = data
    //             this.getVersion()
    //         })
    //         .catch((error) => {
    //             this.addMessage("Couldn't fetch URI.",true,true)
    //         })
    // }

    // fetchStroll() {
    //     fetch(this.uri)
    //         .then(response => response.json())
    //         .then(data => {
    //             this.stroll = data
    //             this.getVersion()
    //         })
    //         .catch((error) => {
    //             this.addMessage("Couldn't fetch URI.",true,true)
    //         })
    // }

    // getCanvas(manifest_id, canvas_id) {
    //   let response = await fetch(manifest_id)
    //   let manifest = await response.json()
    //
    //   console.log({getin:manifest_id,getc:canvas_id})
    //
    //   // the new way
    //   let canvases = loadManifest(manifest)
    //   store.dispatch({type: 'ADD_CANVASES',data: {
    //     iiifManifest: canvases
    //   }})
    //
    //   // the old way
    //   console.log(manifest)
    //   // switch to manifesto!?
    //   for(let skey in manifest['sequences'][0]['canvases']) {
    //     if(manifest['sequences'][0]['canvases'][skey]['@id']===canvas_id) {
    //       return clone(manifest['sequences'][0]['canvases'][skey])
    //     }
    //   }
    //   console.log("CHECK PROBLEM "+canvas_id+" "+manifest_id)
    //   return false
    // }
}

module.exports = svParser