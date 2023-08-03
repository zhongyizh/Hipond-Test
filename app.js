// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 初始化云环境
    wx.cloud.init({
      env: 'prod-7g6093dm5b302413'
    });
    // 登录
    wx.login({
      async success (res) {
        if (res.code) {
          console.log(res.code);
          const cloudLoginCred = await wx.cloud.callContainer({
              "config": {
                "env": "prod-7g6093dm5b302413"
              },
              "path": "/api/login",
              "header": {
                "X-WX-SERVICE": "flask-9s0h"
              },
              "method": "POST",
              "data": {
                  "code": res.code
              }
          });
          console.log("sessionId: " + cloudLoginCred.data.session);
          console.log("userId: " + cloudLoginCred.data.user_id);
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})
