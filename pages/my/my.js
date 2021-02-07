import { post } from '../request.js';
import { getStorage } from '../tool.js';

Page({
  data: {
    summaryInfo: null,
    isAdmin: 0
  },
  onShow() {
    this.getSummary();

    let key = 'isAdmin'

    getStorage(key).then((res) => {
      this.setData({
        isAdmin: res
      })
    })
  },

  getSummary() {
    //从缓存中获取staffno
    let key = 'staffno'

    getStorage(key).then((res) => {
      let url = '/query_RewardPointSummary'
      let data = {
        jobid: String(res),
        page:1,
        pageSize:10
      }
      post(url, data).then(res => {
        this.setData({
          summaryInfo: res.data.detail[0]
        })
      })
    })
  },
});
