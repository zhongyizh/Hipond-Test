import { getImages } from '../../../utils/dummyImages'
const app = getApp()

function getnewList() {
    const newList = new Array(20).fill(0)
    const imgUrlList = getImages()
    let count = 0
    for (let i = 0; i < newList.length; i++) {
      newList[i] = {
        idx: i,
        title: `scroll-view`,
        desc: `默认只会渲染在屏节点，会根据直接子节点是否在屏来按需渲染`,
        time: `19:20`,
        like: 88,
        image_url: imgUrlList[(count++) % imgUrlList.length],
      }
    }
    return newList
}

// pages/Tabbar/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: getnewList(),
        cur_tabbar_index: 0,
        crossAxisCount: 2,
        crossAxisGap: 10,
        mainAxisGap: 0
    },

    bindscrolltolower() {
        this.setData({
          list: this.data.list.concat(getnewList())
        })
    },
    
    binderror(event) {
        this.setData({
          error: '错误'//event.detail.errMsg
        })
    },
    

    wxNavAction() {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      },
     /* 生命周期函数--监听页面加载
     */
    onLoad: function(e) {
        this.getTabBar().setData({
            selected: 0
        }), this.data.isOnShow || (this.setData({
            header: [ {
                type: 0,
                plate_name: "关注"
            }, {
                type: 1,
                plate_name: "推荐"
            }, {
                type: 2,
                plate_name: "热榜"
            } ]
        }), this.userPlate()), this.indexChoiceness(), this.indexPosts();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            selected: 0
        });
        var e = this;
        e.getSysMessageCount().then(function(t) {
            e.getTabBar().setData({
                sysMessageCount: t
            });
        }), e.data.isOnShow && (e.setData({
            header: [ {
                type: 0,
                plate_name: "关注"
            }, {
                type: 1,
                plate_name: "推荐"
            }, {
                type: 2,
                plate_name: "热榜"
            } ],
            isOnShow: !1
        }), e.userPlate()), e.searchCarouselList();
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