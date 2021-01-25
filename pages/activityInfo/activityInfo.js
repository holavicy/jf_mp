import { post } from '../request.js';

Page({
  data: {
    id:'',
    info: null
  },
  onLoad(options) {
    let id = options.id || '';
    this.setData({
      id: id
    })
  },

  onShow(){
    this.getActivityInfo();
  },

  getActivityInfo(){
    let id = this.data.id;
    let url = '/get_activity_info';
    let data = {
      id: Number(id)
    }

    post(url, data).then(res => {
      console.log(res);
      this.setData({
        info: res.data
      })
    })
  }
});
