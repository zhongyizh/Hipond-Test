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
    // 获取用户当前设备的上边缘、右边缘和微信小程序自带导航栏高度
    // 参考：https://blog.51cto.com/u_15803377/5704676
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight;
        let navTop = menuButtonObject.top;
        let navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        let navRight = res.windowWidth - menuButtonObject.right;
        this.globalData.userDeviceBoundingSpecs.navbarDefaultHeight = navHeight;
        this.globalData.userDeviceBoundingSpecs.navbarMarginTop = navTop;
        this.globalData.userDeviceBoundingSpecs.navbarMarginRight = navRight;
        this.globalData.userDeviceBoundingSpecs.windowHeight = res.windowHeight;
      },
      fail(err) { console.log(err); }
    })
  },
  globalData: {
    userInfo: null,
    userDeviceBoundingSpecs: {
      navbarDefaultHeight: 0,
      navbarMarginTop: 0,
      navbarMarginRight: 0,
      windowHeight: 0
    }
  }
})
