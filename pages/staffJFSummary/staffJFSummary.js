import { post } from '../request.js';

Page({
  data: {
    page: 1,
    pageSize: 10,
    list: [],
    totalLength: -1,
    staffNo: '',
    staffName: ''
  },
  onLoad() {},

  onShow() {
    this.setData({
      page: 1,
      list:[]
    })
    this.getList();
  },

  onReachBottom() {
    //获取总条数
    let totalLength = this.data.totalLength;
    console.log(totalLength)
    //获取当前页数
    let page = this.data.page;
    let pageSize = this.data.pageSize
    //获取最大页数

    let maxPage = Math.ceil(totalLength/pageSize)
    //如果当前页数小于最大页数，当前页数加一，并获取list

    if(page<maxPage) {
      this.setData({
        page: page+1
      })

      this.getList()
    } else{
      console.log('结束')
    }
    //如果大于等于则不作处理
  },

  // query_RewardPointSummary

  // 获取所有员工的积分汇总信息
  getList() {
    let page = this.data.page;
    let pageSize = this.data.pageSize;
    let listOri = this.data.list

    let data = {
        page: page,
        pageSize: pageSize,
        onduty: 0,
        name: this.data.staffName,
        jobid: this.data.staffNo? String(this.data.staffNo):'',
      }
    const u = '/query_RewardPointSummary'
    post(u, data).then(res => {
      let list = listOri.concat(res.data.detail);

      this.setData({
        list: list,
        totalLength: res.data.totalLength
      })
      }, rej => { console.log(rej)})
    },

  setStaffNo (e) {
    this.setData({
      staffNo: e.detail.value
    })
  },

  setStaffName (e) {
    this.setData({
      staffName: e.detail.value
    })
  },

  search () {
    this.setData({
      currentPage: 1,
      list: [],
      totalLength: -1
    })
    this.getList()
  },
});
