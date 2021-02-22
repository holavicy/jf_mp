App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    this.getUserInfo();
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    // this.getUserInfo();
  },

  getUserInfo(){
    dd.getAuthCode({
    success:(res)=>{

      let corpId = 'dingcd0f5a2514db343b35c2f4657eb6378f';
      let d = {
                code: res.authCode,
                corpId: corpId
              }

      let data = JSON.stringify(d);
      let url = 'http://'+this.globalData.HOST+'/getUserInfo'

      dd.httpRequest({
            url: url,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            data: data,
            dataType: 'json',
            success: (res) => {
              dd.setStorage({
                key: 'token',
                data: res.data.token
              });
              if (this.checkLoginReadyCallback){
                this.checkLoginReadyCallback(res);

    //             const token = util.cookies.get('token')
    // console.log(token)
    // Authorization: token,
              }

              dd.setStorage({
                        key: 'isAdmin',
                        data: 0
                      });

              dd.setStorage({
                        key: 'isLeader',
                        data: 0
                      });

              res.data.data.roles.map((item) => {
                    if (item.id === 1505687807) {
                      dd.setStorage({
                        key: 'isAdmin',
                        data: 1
                      });
                    }

                    if (item.id === 1505828740) {
                      dd.setStorage({
                        key: 'isLeader',
                        data: 1
                      });
                    }
                  })

            },
            fail: (res) => {
                console.log(res);
            }
        });
    },
    fail:function(err){
      console.log(err)
    }
});
  },

  globalData: {
    checkLogin: false,
    HOST: '222.186.81.37:5000'
  }
});
