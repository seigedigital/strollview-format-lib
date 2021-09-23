class v2Parser {

    getNumberOfPages(stroll) {
        return stroll.first.items.length
    }

    getTitle(stroll) {
        return stroll.label
    }

    getCreator(stroll) {
        return stroll.creator
    }

    getRights(stroll) {
        return stroll.rights
    }

    getItem(stroll,n) {
        let retval={
            data: {},
            errors: 0,
            messages: []
        }
        let item=stroll.first.items[n]
        try {
            retval.data.manifest_id = item.strollview.manifest_id
            retval.data.canvas_id = item.strollview.canvas_id
            retval.data.image_id = item.strollview.image_id
            retval.data.image_srv = item.strollview.image_srv
            if('id' in item.target) {
              let xywh = item.target.id.split('#')
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
            retval.data.description = item.body.value
            retval.data.filters = item.strollview.filters
            retval.data.rotation = item.strollview.rotation
            retval.data.passepartout = item.strollview.passepartout
            retval.data.passepartout_color = item.strollview.passepartout_color
            retval.data.passepartout_invert = item.strollview.passepartout_invert
            retval.data.audio = item.strollview.audio
        } catch(error) {
            retval.data = false
            retval.errors = 1
            retval.messages = ['Cannot parse Item: '+JSON.stringify(item.strollview)]
        }
        return retval
    }

    // convertCoordinates(rect,canvas) {
    //     if(canvas===false) {
    //         return {x:0,y:0,w:1,h:1}
    //     }
    //     let rv = {}
    //     rv.x = rect.x/canvas.width
    //     rv.w = rect.w/canvas.width
    //     rv.y = rect.y/canvas.width
    //     rv.h = rect.h/canvas.width
    //     return rv
    // }

}

module.exports = v2Parser
