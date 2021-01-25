// const HOST = "http://192.168.40.161:5000/Interface"
// const HOST = "http://127.0.0.1:5000/Interface"
const HOST = "http://222.186.81.37:5000/Interface"
const app = getApp();


function formatObj (obj) {
  Object.keys(obj).forEach(item=>{
      if(obj[item] !== 0 && !obj[item])  delete obj[item]
  })
  return obj;
}

export function post(u, d){
    const url = HOST + u;
    d = formatObj(d)
    const data = JSON.stringify(d);
    return new Promise((resolve, reject) => {
        dd.getStorage({
            key: 'token',
            success(res) {
            dd.httpRequest({
                url: url,
                method: 'POST',
                headers: {
                    Authorization: res.data,
                    "Content-Type": "application/json"
                },
                data: data,
                dataType: 'json',
                success: (res) => {
                    // console.log(res)
                    if(res.data.code == 0){
                        resolve(res.data)
                    } else if (res.data.code == 9997){
                        console.log('????');
                        app.getUserInfo();

                    } else {
                        resolve(res.data)
                    }
                    
                },
                fail: (res) => {
                    console.log(res);
                    reject(res)
                }
            });
        },
      });
            
          })
    
}