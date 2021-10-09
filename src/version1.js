class v1Parser {

    getNumberOfPages(stroll) {
        return stroll.pages.length
    }

    getTitle(stroll) {
        try {
            let retval = stroll.metadata.title
            return retval
        } catch {
            return ""
        }
    }

    getCreator(stroll) {
        try {
            let retval = stroll.metadata.author
            return retval
        } catch {
            return ""
        }
    }

    getRights(stroll) {
        try {
            let retval = stroll.metadata.license
            return retval
        } catch {
            return ""
        }
    }

    getItem(stroll,n) {
        let retval={
            data: {},
            errors: 0,
            messages: []
        }
        let item=stroll.pages[n]
        try {

            retval.data.manifest_id = item.items[0].target.manifest_id
            retval.data.canvas_id = item.items[0].target.canvas_id
            retval.data.image_id = item.items[0].target.image_id
            retval.data.image_srv = item.items[0].target.image_srv

            retval.data.description = ''

            for(let key in item.items) {
              if('id' in item.items[key].target) {
                let xywh = item.items[key].target.id.split('#')
                if(xywh.length>1) {
                  xywh=xywh[1].split(',')
                  if(xywh.length>3) {
                    retval.data.selector = {
                      x:parseInt(xywh[0]),
                      y:parseInt(xywh[1]),
                      w:parseInt(xywh[2]),
                      h:parseInt(xywh[3])
                    }
                  }
                }
              }
              // append body(ies)
              if(item.items[key].body.value!==undefined) {
                retval.data.description += ' '+item.items[key].body.value
              }
            }

        } catch(error) {
            retval.data = false
            retval.errors = 1
            retval.messages = ['Cannot parse Item: '+JSON.stringify(item.strollview)]
        }
        return retval
    }

}

module.exports = v1Parser
