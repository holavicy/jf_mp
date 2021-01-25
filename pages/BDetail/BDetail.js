import { post } from '../request.js';
import { getStorage } from '../tool.js';

Page({
  data: {
    index:2,
    type: 'B',
    summaryInfo: null,
    list: [],
    page: 1,
    pageSize: 10,
    totalLength: -1,
    array:[],
    yearTotalNum:0
  },
  onLoad(query) {
    this.setData({
      // query.type:0未兑换，1已兑换，2总获得，3年度总获得
      fromType: query.type,
    })
  },

  onShow() {
    this.setData({
      page: 1
    })
    this.getList();
    this.getSummary();
    this.initArray();
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

  initArray(){
    let day = new Date();
    let year = day.getFullYear();
    let array = [];
    let start = 2018;

    for(let i = start;i<=year;i++){
      array.push(i)
    }
    this.setData({
      array:array,
      index: array.length-1
    })
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
        rewardPointsType: "管理积分",
        jobid: String(res)
      }

      if (this.data.fromType == 3){
        let year = this.data.array[this.data.index]
        data.beginDate  = year + '-01-01 00:00:00';
        data.endDate =  year + '-12-31 23:59:59';
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
          summaryInfo: res.data.detail[0],
          yearTotalNum: res.data.detail[0]["年度管理积分"]
        })
      })
    })
  },

    bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value,
       list: [],
    page: 1,
    totalLength:-1
    });
    this.getList();
    this.getTotalYearNum();
  },

  // 获取年度管理积分总和
  getTotalYearNum(){
    // /query_FixedPoints_ByYear

    let key = 'staffno'

    getStorage(key).then((res) => {
      let url = '/query_FixedPoints_ByYear'
      let data = {
        jobid: String(res),
        year: Number(this.data.array[this.data.index])
      }
      post(url, data).then(res => {
        console.log(res);
        this.setData({
          yearTotalNum: res.data || 0
        })
      })
    })
  }
});
