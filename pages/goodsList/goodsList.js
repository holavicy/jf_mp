import { post } from '../request.js';
import { getStorage } from '../tool.js';

Page({
  data: {
    actionType: 2,
    list:[],
    totalLength: -1,
    page: 1,
    pageSize: 10,
    cartNum:0,
    showImg:false,
    staffno:''
  },
  onLoad() {},

  onShow() {
    this.setData({
      page: 1,
      list:[]
    })
    this.getList();
    let key = 'staffno';
    getStorage(key).then( (res)=> {
      this.setData({
        staffno: res
      })
      this.getCartList(res);
    })
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

  getList() {
      let page = this.data.page;
    let pageSize = this.data.pageSize;
    let listOri = this.data.list

    let data = {
        page: page,
        pageSize: pageSize,
        Status:0
      }
    const u = '/query_goods'
    post(u, data).then(res => {
      let list = listOri.concat(res.data.detail);

      this.setData({
        list: list,
        totalLength: res.data.total
      })
      }, rej => { console.log(rej)})
  },

  getCartList(staffno){
    let url = "/query_cart";
    let data = {
      Operator: String(staffno)
    }

    post(url, data).then(res => {
      console.log(res);

        let goodsList = res.data;
    let totalNum = 0;
    goodsList.map((goods) => {
      totalNum = totalNum + goods.GoodsAmount;
    })

    this.setData({
      cartNum: totalNum
    })
    })
  },

  navigate(e) {
    dd.switchTab({
        url: '../../pages/shopcart/shopcart'
      }
    );
  },

  onViewImg(d){
    console.log(d);
    this.setData({
      currentImg:d,
      showImg: true
    })
  },
  hideImg(){
    this.setData({
      currentImg:'',
      showImg: false
    })
  },

  addCart(){
    let staffno = this.data.staffno;
    this.getCartList(staffno)
  }
});
