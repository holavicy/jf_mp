import { post } from '../request.js';
import { getStorage } from '../tool.js';

Page({
  data: {
    type: 'A',
    summaryInfo: null,
    list: [],
    page: 1,
    pageSize: 10,
    isAccounted:null,
    totalLength: -1
  },
  onLoad(query) {
    this.setData({
      isAccounted: query.type==0 ||  query.type==1? Number(query.type):''
    })
  },

  onShow() {
    this.setData({
      page: 1
    })
    this.getList();
    this.getSummary();
  },

  onReachBottom() {
    console.log(123);
    //获取总条数
    let totalLength = this.data.totalLength;
    //获取当前页数
    let page = this.data.page;
    let pageSize = this.data.pageSize
    //获取最大页数

    let maxPage = Math.ceil(totalLength/pageSize)
    //如果当前页数小于最大页数，当前页数加一，并获取list

    if(page<maxPage) {
      console.log('加载');
      this.setData({
        page: page+1
      })

      this.getList()
    } else{
      console.log('结束')
    }
    //如果大于等于则不作处理
  },

  getList() {
    let key = 'staffno'
    getStorage(key).then( (res) => {
      let page = this.data.page;
    let pageSize = this.data.pageSize;
    let listOri = this.data.list

    let data = {
        page: page,
        pageSize: pageSize,
        rewardPointsType: "A分",
        isAccounted: this.data.isAccounted,
        jobid: String(res)
      }
    const u = '/query_rewardPoint'
    post(u, data).then(res => {
      res.data.detail.map((item) => {
        item.AssessmentDate = item.AssessmentDate.split(' ')[0]
      })
      let list = listOri.concat(res.data.detail);

      this.setData({
        list: list,
        totalLength: res.data.totalLength
      })
      }, rej => { console.log(rej)})
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
