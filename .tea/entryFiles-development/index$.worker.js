if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/goodsItem/goodsItem?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/shopcart/shopcart?hash=c3d85fb6daf194aa56f683cbf4859712624b6a93');
require('../../pages/my/my?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/utils/goodsItem/goodsItem?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/detail/detail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/BDetail/BDetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/utils/detailItem/detailItem?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/goodsList/goodsList?hash=c3d85fb6daf194aa56f683cbf4859712624b6a93');
require('../../pages/utils/empty/empty?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/activityInfo/activityInfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/fixDetail/fixDetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/orderList/orderList?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/orderInfo/orderInfo?hash=c3d85fb6daf194aa56f683cbf4859712624b6a93');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}