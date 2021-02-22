import { post } from '../request.js';
import { getStorage } from '../tool.js';

Page({
  data: {
    summaryInfo: null,
    isAdmin: 0,
    rankB: '--',
    rankBfix: '--',
    rankAll: '--'
  },
  onShow() {
    this.getSummary()

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
        this.getScoreSummary()
      })
    })
  },

  getScoreSummary() {
    let url = '/query_RewardPointSummary'
    let data = {
      onduty: 0
      }
    post(url, data).then(res => {
      console.log('get all data')
      let summaryInfo = this.data.summaryInfo
      console.log(this.data.summaryInfo)
      let allData = res.data.detail
      let rankB = 1
      let rankBfix = 1
      let rankAll = 1
      allData.map(item => {
        if (item['年度管理积分'] > summaryInfo['年度管理积分']) {
          rankB ++
        }

        if (item['总获得管理积分'] > summaryInfo['总获得管理积分']) {
          rankBfix ++
        }

        if (item['总累计积分'] > summaryInfo['总累计积分']) {
          rankAll ++
        }
      })

      console.log(rankB)
      console.log(rankBfix)
      console.log(rankAll)
      this.setData({
        rankB: rankB,
        rankBfix: rankBfix,
        rankAll: rankAll
      })

    })
  }
});
