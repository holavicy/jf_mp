import { post } from '../request.js';
import { getStorage } from '../tool.js';

Page({
  data: {
    summaryInfo: null,
    detaiInfo: null,
    zwShow: false,
    zcShow: false,
    xlShow: false,
    glShow: false,
  },
  onShow() {
    let key = 'staffno';
    getStorage(key).then( (res)=> {
      // res = '100003'
      // res = '100016'
      // res = '100135'
      // res='100018'
      // res = '100015'
      // res = '100059'
      this.getSummary(res);
      this.getDetail(res);
    })
  },

  getSummary(staffno){
    let url = '/query_RewardPointSummary'
    let data = {
      jobid: String(staffno),
      page:1,
      pageSize:10
    }
    post(url, data).then(res => {
      this.setData({
        summaryInfo: res.data.detail[0]
      })
    })
  },

  getDetail(staffno){
    let url = '/query_B_RewardPoint'
      let data = {
        jobid: String(staffno)
      }
      post(url, data).then(res => {
        console.log(res.data["职务积分"]);
        let totalZW = 0;
        let zwList = res.data["职务积分"];
        zwList.map((item) => {
          totalZW = totalZW + item.jobrankpoint
        })
        res.data.totalZW = totalZW;
        this.setData({
          detaiInfo: res.data,
          zwList: zwList
        })
      })
  },

  triggerDetail(event){
    let type = event.target.dataset.type;
    console.log(type);

    if(type == 'zw'){
      this.setData({
        zwShow: !this.data.zwShow,
        zcShow: false,
        xlShow: false,
        glShow: false
      })
    }

    if(type == 'zc'){
      this.setData({
        zcShow: !this.data.zcShow,
        zwShow: false,
        xlShow: false,
        glShow: false
      })
    }

    if(type == 'xl'){
      this.setData({
        xlShow: !this.data.xlShow,
        zcShow: false,
        zwShow: false,
        glShow: false
      })
    }

    if(type == 'gl'){
      this.setData({
        glShow: !this.data.glShow,
        zcShow: false,
        xlShow: false,
        zwShow: false
      })
    }
  }
});
