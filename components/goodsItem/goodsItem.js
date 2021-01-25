import { post } from '../../pages/request.js';
import { getStorage } from '../../pages/tool.js';

Component({
  mixins: [],
  data: {
    staffno:null,
    domain: '222.186.81.37:5000'
  },
  props: {
    goods: null
  },
  didMount() {
    let key = "staffno"
    getStorage(key).then(res => {
      this.setData({
        staffno: Number(res)
      })
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    addCart(e){
      let url = '/add_cart';
      let goodsId = e.target.dataset.goodsid;
      let data = {
        GoodsID: goodsId,
        num: 1,
        Operator: this.data.staffno
      }

    //  dd.showLoading();
      post(url, data).then(res => {
        // console.log(res);
        // dd.hideLoading();
        if(res.code == 0){
          this.props.onAddCart();
          dd.showToast({
            content: '成功加入购物车',
            type: 'success',
            duration: 2000
          });
        } else {
          dd.showToast({
            content: res.msg || '加入购物车失败，请稍后再试',
            type: 'fail',
            duration: 1500
          });
        }
      })
    },

    editNum(e){
      let type = e.target.dataset.type;
      let goods = this.props.goods;
      console.log(goods)
      let stock = goods.TotalIn - goods.TotalLock - goods.TotalOut
      console.log(stock)

      if(type == 'min'){
        if(goods.GoodsAmount > stock){
           this.editNumFc(goods.ShoppingCartID, goods.GoodsID, stock).then(res => {
            if(res.code == 0){
              this.props.onNumChange();
            }
          })
        }
        // 判断当前商品的数量是否为1，若为1，提示是否确认从购物车删除，若不为一，商品数量减一
        else if(goods.GoodsAmount <= 1){

          dd.confirm({
            title: '温馨提示',
            content: '确定从购物车移除此商品？',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            success: (result) => {

              if(result.confirm){
                      this.deleteCartFc(goods.ShoppingCartID).then((res) => {
                          if(res.code == 0){
                            dd.showToast({
                              content: '移除成功',
                              type: 'success',
                              duration: 1500
                            });
                            this.props.onNumChange();
                          }
                      })
                    }
            },
          });

        } else {
          this.editNumFc(goods.ShoppingCartID, goods.GoodsID, goods.GoodsAmount-1).then(res => {
            if(res.code == 0){
              this.props.onNumChange();
            }
          })
        }
      }

      if(type == 'add'){
        console.log('add')
        // 判断数量是否大于库存，若大于，提示，若不大于，修改购物车数量
        if (goods.GoodsAmount >= (goods.TotalIn-goods.TotalOut)) {
          dd.showToast({
            content: '库存不足',
            type: 'fail',
            duration: 1500
          });
          return
        } else{
          this.editNumFc(goods.ShoppingCartID, goods.GoodsID, goods.GoodsAmount+1).then(res => {
            if(res.code == 0){
              this.props.onNumChange();
            }
          })
        }
      }
      
    },

    editNumFc(ShoppingCartID, GoodsID, GoodsAmount){
      return new Promise((resolve, rejects) => {
        let url = '/edit_cart_num';
        let data = {
          ShoppingCartID: ShoppingCartID,
          num: GoodsAmount,
          GoodsID: GoodsID
        }

        post(url, data).then(res => {
          resolve(res)
        })
      })
    },

    deleteCartFc(ShoppingCartID){
      return new Promise((resolve, rejects) => {
        let url = '/delete_cart';
        let data = {
          ShoppingCartID:ShoppingCartID
        }

        post(url, data).then((res) => {
          resolve(res);
        })
      })
    },

    viewImage(e){
      let url = 'http://'+this.data.domain+ e.target.dataset.img;
      this.props.onViewImg(url);
    }
  },
});
