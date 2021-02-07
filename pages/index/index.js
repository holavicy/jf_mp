const app = getApp();
import { post } from '../request.js';
import { compareDate, getStorage } from '../tool.js';
Page({
    data: {
      summaryInfo: null,
      activityList: [],
      indicatorDots: true,
      autoplay: false,
      vertical: false,
      interval: 1000,
      circular: false,
      test: false
  },
  onShow(query) {
    // 页面加载
    // console.info(`Page onLoad with query/: ${JSON.stringify(query)}`);

    let that = this;
    //判断onLaunch是否执行完毕
    if (app.globalData.checkLogin){
      that.setData({
        test:true
      })
    }else{
      app.checkLoginReadyCallback = res => {
        console.log(333333)
        dd.setStorage({
          key: 'staffno',
          data: res.data.data.jobnumber
          // data: '100236'
          // data:'100017'
        });
        dd.setStorage({
          key: 'name',
          data: res.data.data.name
        });

        this.getSummary();
        this.getActivityList();
      };
    }
  },
  onReady() {
    // 页面加载完成
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
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

  getActivityList() {
    let url = '/query_activity'
    let data = {
      title: '',
      page: 1,
      pageSize: 100
    }

    post(url, data).then(res => {
      let list = res.data.detail;
      let result = []
      list.map(item => {
        if (compareDate(item.EndDateTime, new Date())) {
          result.push(item)
        }
      })

      this.setData({
          activityList: result
        })
    }) 
  }
});
