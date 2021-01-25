import { post } from '../request.js';
import { getStorage } from '../tool.js';

Page({
  data: {
    actionType: 1,
    summaryInfo: null,
    goodsList: [],
    totalNum: 0,
    totalPrice: 0
  },
  onShow() {
    let key = 'staffno';
    getStorage(key).then( (res)=> {
      this.setData({
        staffno: res
      })
      this.getSummary(res);
      this.getCartList(res);
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

  getCartList(staffno){
    let url = "/query_cart";
    let data = {
      Operator: String(staffno)
    }

    post(url, data).then(res => {
      console.log(res);
      res.data.map((item) => {
        item.TotalLock = item.TotalLock || 0
      })
      this.setData({
        goodsList: res.data
      });
      this.computedGoods();
    })
  },

  // 计算购物车总数量和总价格
  computedGoods(){
    let goodsList = this.data.goodsList;
    let totalNum = 0;
    let totalPrice = 0;
    let ShoppingCartIDList = [];
    let GoodsIDList = [];
    goodsList.map((goods) => {
      ShoppingCartIDList.push(goods.ShoppingCartID);
      GoodsIDList.push(goods.GoodsID);
      totalNum = totalNum + goods.GoodsAmount;
      totalPrice = totalPrice + goods.GoodsAmount*goods.PointCost
    })

    this.setData({
      ShoppingCartIDList: ShoppingCartIDList,
      GoodsIDList: GoodsIDList,
      totalNum: totalNum,
      totalPrice: totalPrice
    })
  },

  //创建订单
  createOrder(){
    if(this.data.GoodsIDList.length<=0){
      return
    }
    //校验商品总价是否小于钱包金额，若大于提示
    let actualTotalPrice = this.data.summaryInfo["现有管理积分"];
    let totalPrice = this.data.totalPrice;

    if (actualTotalPrice<totalPrice) {
      dd.showToast({
        content: '当前可兑换积分不足',
        type: 'fail',
        duration: 1500
      });
      return
    }

      dd.confirm({
            title:'温馨提示',
            content: '确定提交订单？',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            success: (result) => {
              if(result.confirm){
                let url = '/create_order';

    let data = {
      ShoppingCartIDs:this.data.ShoppingCartIDList.join(','),
      GoodsIDs: this.data.GoodsIDList.join(','),
      Operator: this.data.staffno
      }

    post(url, data).then(res => {
      console.log(res)
      if(res.code == 0){
        dd.showToast({
        content: '订单提交成功，等待管理员确认中',
        type: 'success',
        duration: 2000
      });
      setTimeout(function(){
        dd.navigateTo({
        url: '../../pages/orderList/orderList'
      });
      },2000)
      } else {
        dd.showToast({
          content: res.msg,
        type: 'fail',
        duration: 2000
        })
      }
      
      
    })
                
              }
            },
          });

    
  },

  onNumChange(){
    this.getCartList(this.data.staffno);
  }
});
