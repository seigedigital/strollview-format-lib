function parseV2(stroll,gistid,uri) {

    // this.setState({
    //   loaders_sum: stroll.first.items.length,
    //   loaders_err: 0,
    //   loaders_ok: 0,
    //   loaders_msg: [],
    //   openload: true,
    //   openload_disabled: true
    // })
    // let error = false
    // let errkey = 0
    // let msg = []
    // stroll.id = uri
    //
    // store.dispatch({type: 'UPDATE_SETTINGS', data: { settings : { baseurl : uri, github_gist_id: gistid } } })
    // for(let key in stroll.first.items) {
    //   let item = stroll.first.items[key]
    //   error = false
    //   let data = {}
      data.manifest_id = item.strollview.manifest_id
      data.canvas_id = item.strollview.canvas_id
      data.image_id = item.strollview.image_id
      data.image_srv = item.strollview.image_srv
      console.log("b")
      let canvas = await this.getCanvas(data.manifest_id,data.canvas_id)

      if(canvas===false) {
        msg.push(<Typography key={errkey+=1}>{"("+key+") Canvas ID not found: "+data.canvas_id}</Typography>)
        console.log({CHECK_ERROR:data.canvas_id,canvas:canvas})
        error = true
      }

      // if(this.checkID(canvas,data.image_id)===true) {
      //   // console.log("CHECK FOUND "+data.image_id)
      // } else {
      //   error = true
      //   msg.push(<Typography key={errkey+=1}>{"("+key+") Image ID not found: "+data.image_id}</Typography>)
      //   console.log({CHECK_ERROR:data.image_id,canvas:canvas})
      // }

      if(this.checkID(canvas,data.image_srv)===true) {
        // console.log("CHECK FOUND "+data.image_srv)
      } else {
        error = true
        msg.push(<Typography key={errkey+=1}>{"("+key+") Image Service not found: "+data.image_srv}</Typography>)
        console.log({CHECK_ERROR:data.image_srv,canvas:canvas})
      }

    /*      let checkisrv = await fetch(data.image_srv) // ,{mode:'cors'})
      if (checkisrv.ok!==true) {
          let checkisrv = await fetch(data.image_srv+"/info.json") // ,{mode:'cors'})
          if (checkisrv.ok!==true) {
            console.log({CHECK_ISRV:data.image_srv})
            msg.push(<Typography key={errkey+=1}>{"("+key+") Image Service not accessible: "+data.image_srv}</Typography>)
            error = true
          }
      }
    */
      console.log({cb:canvas})

      data.canvas_bin = canvas

      if(error===false) {
        this.setState({
          loaders_ok: this.state.loaders_ok+1,
        })
        console.log("CHECK NO ERRORS")
      } else {
        this.setState({
          loaders_err: this.state.loaders_err+1,
          loaders_msg: msg
        })
        console.log("CHECK ERRORS OCCURED")
      }

      data.selector = false

      if('id' in item.target) {
        let xywh = item.target.id.split('#')
        if(xywh.length>1) {
          xywh=xywh[1].split(',')
          if(xywh.length>3) {
            data.selector = this.convertCoordinates({
              x:parseInt(xywh[0]),
              y:parseInt(xywh[1]),
              w:parseInt(xywh[2]),
              h:parseInt(xywh[3])
            },canvas)
          }
        }
      }

      data.description = item.body.value
      data.filters = item.strollview.filters
      data.rotation = item.strollview.rotation
      data.passepartout = item.strollview.passepartout
      data.passepartout_color = item.strollview.passepartout_color
      data.passepartout_invert = item.strollview.passepartout_invert
      data.audio = item.strollview.audio

      store.dispatch({type: 'PL_IMPORT_ITEM', data})
    }

    let newsettings=this.parseMetadata(stroll,gistid,uri)
    store.dispatch({type: 'UPDATE_SETTINGS', data: { settings : newsettings } })
    this.setState({
      openload_disabled: false,
      openload: (this.state.loaders_err!==0)
    })
}

module.exports.parseV2 = parseV2
