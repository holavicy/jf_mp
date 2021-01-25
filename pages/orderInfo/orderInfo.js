import { post } from '../request.js';

Page({
  data: {
    id:'',
    list: [],
    actionType:3
  },
  onLoad(options) {
    let id = options.id || '';
    console.log(id);
    this.setData({
      id: id
    })

    this.getGoodsList();
  },

  getGoodsList(){
    let PointOrderID = String(this.data.id);

     let data = {
        PointOrderID: PointOrderID
      }
    const u = '/query_orderDetail'
    post(u, data).then(res => {
      console.log(res.data);
      let list = res.data;

      this.setData({
        list: list
      })
      }, rej => { console.log(rej)})

  }
});
