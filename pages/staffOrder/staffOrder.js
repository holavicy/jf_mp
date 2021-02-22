import { post } from '../request.js';
import { getStorage, formatDate } from '../tool.js';

Page({
  data: {
    operator: '',
    list:[],
    totalLength: -1,
    page: 1,
    pageSize: 10,
    orderStatus:'',
    staffNo: '',
    staffName: '',
    orderStatusDic: {

    "0": "交易完成",
    "1": "待确定",
    "2": "可领取",
    "3": "已退回",
    "4": "已取消"
  },
  statusList: [{
    key:'',
    text:'全部'
  }, {
    key:1,
    text:'待确定'
  },{
    key:2,
    text:'可领取'
  },{
    key:3,
    text:'已退回'
  },{
    key:0,
    text:'交易完成'
  }]
  },
  onShow() {
    this.setData({
      page: 1,
      list:[],
      totalLength:-1
    })
    let key="staffno";
    getStorage(key).then(res => {
      this.setData({
        operator: res
      })
      this.getList();
    })
    
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
    let page = this.data.page;
    let pageSize = this.data.pageSize;
    let listOri = this.data.list;
    let Operator = this.data.staffNo;
    let status = String(this.data.orderStatus)
    console.log(Operator)

    let data = {
        page: page,
        pageSize: pageSize,
        Operator: Operator,
        OrderStatus: status
      }
    const u = '/query_order'
    post(u, data).then(res => {
      console.log(res.data.detail);
      let list = listOri.concat(res.data.detail);

      this.setData({
        list: list,
        totalLength: res.data.totalLength
      })
      }, rej => { console.log(rej)})
  },

  setStatus(e){
    let key = e.target.dataset.key;
    console.log(key);
    this.setData({
      orderStatus: key,
         list:[],
         totalLength: -1,
         page: 1
    })

    this.getList();
  },

  finishOrder(e){
    let id = e.target.dataset.id;

    let data = {
                Operator: this.data.operator,
                PointOrderID: id,
                time: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            }
    dd.confirm({
            title:'温馨提示',
            content: '确定已领取？',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            success: (result) => {
              if(result.confirm){
                this.finishOrderFc(data).then((res) => {
                    if(res.code == 0){
                      dd.showToast({
                        content: '操作成功',
                        type: 'success',
                        duration: 1500
                      });
                        this.setData({
                          list:[],
                          totalLength: -1,
                          page: 1
                      })
                      this.getList()
                    }
                })
              }
            },
          });
  },

  finishOrderFc(data){
    return new Promise((resolve, rejects) => {
      const u = '/finish_order'
      post(u, data).then(res => {
        console.log(res)
        resolve(res)
        }, rej => { console.log(rej)})
    })
    
  },

  // 审核通过订单
  confirmOrder(e){
    let id = e.target.dataset.id;

    let data = {
      PointOrderID: id
    }
    dd.confirm({
      title:'温馨提示',
      content: '确定审核通过此订单？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          this.confirmOrderFc(data).then((res) => {
              if(res.code == 0){
                dd.showToast({
                  content: '操作成功',
                  type: 'success',
                  duration: 1500
                });
                  this.setData({
                    list:[],
                    totalLength: -1,
                    page: 1
                })
                this.getList()
              }
          })
        }
      }
    });
  },
  confirmOrderFc (data) {
    return new Promise((resolve, rejects) => {
      const u = '/confirm_order'
      post(u, data).then(res => {
        console.log(res)
        resolve(res)
        }, rej => { console.log(rej)})
    })
  },

  // 退回订单
  rejectOrder (e) {
     let id = e.target.dataset.id;

    let data = {
      PointOrderID: id
    }
    dd.confirm({
      title:'温馨提示',
      content: '确定退回此订单？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          this.rejectOrderFc(data).then((res) => {
              if(res.code == 0){
                dd.showToast({
                  content: '操作成功',
                  type: 'success',
                  duration: 1500
                });
                  this.setData({
                    list:[],
                    totalLength: -1,
                    page: 1
                })
                this.getList()
              }
          })
        }
      }
    });
  },
  rejectOrderFc (data) {
    // reject_order

    return new Promise((resolve, rejects) => {
      const u = '/reject_order'
      post(u, data).then(res => {
        console.log(res)
        resolve(res)
        }, rej => { console.log(rej)})
    })
  }
});
