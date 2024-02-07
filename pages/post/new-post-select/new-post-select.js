// pages/new-post-select/new-post-select.js
const { postIdUrl, newPostUrl, uploadUrl } = require("../../../utils/api");
import { checkUserInfo } from '../../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    checkUserInfo().then(res => {
      if (res && res.nickname) {

      }
      else {
          console.log("Failed to get username")
          wx.navigateTo({
              url: "/pages/login/login",
          })
      }
    }).catch(e => {
        console.log(e);
        wx.navigateTo({
            url: "/pages/login/login",
        })
    })
  },
  
  cancel: function() {
    wx.navigateBack();
  },

  post2nd: function() {
    wx.navigateTo({
      // url: '/pages/tab-bar/consignment/consignment',
      url: '/pages/post/new-post-listing/new-post-listing',
    })
  },

  postLife: function() {
    wx.navigateTo({
      url: '/pages/post/new-post/new-post',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})