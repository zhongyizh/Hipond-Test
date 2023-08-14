// app.js
import { checkLoginStatus } from './utils/util'

App({
  onLaunch() {
    // 本地缓存
    const token = wx.getStorageSync('token') || []
    wx.setStorageSync('token', token)
    // 初始化云环境
    wx.cloud.init({
        env: 'prod-7g6093dm5b302413'
    });
    // 登录
    checkLoginStatus();
  },
  globalData: {
    userInfo: null
  }
})
