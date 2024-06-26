const { listPostsUrl, detailsUrl, incrementViewCountUrl } = require("../../../utils/api");
import {
  checkUserVerification
} from '../../../utils/util'
// pages/tab-bar/index.js
Page({
    data: {
        scrollHeight: wx.getSystemInfoSync().windowHeight + 150,
        list: [],
        cur_tabbar_index: 0,
        crossAxisCount: 2,
        crossAxisGap: 4,
        mainAxisGap: 5,
        offset: 0,
        isEnd: false,
        // is_verified: false,
    },

    getPostList() {
        // Load all posts from backend
        wx.request({
            url: listPostsUrl,
            method: 'GET',
            header: {
                'offset': this.data.offset,
            },
            success: res => {
                if (res.data.is_end)
                {
                    this.setData({
                        isEnd: res.data.is_end,
                    })
                }
                if (res.data.post_ids && res.data.next_offset)
                {
                    const postIds = res.data.post_ids
                    this.setData({
                        offset: res.data.next_offset
                    })
                    // request details for each post
                    postIds.forEach(id => {
                        wx.request({
                            url: detailsUrl + '/' + id,
                            method: 'GET',
                            success: (res) => {
                                var post = res.data;-``
                                // console.log(post);
                                post["post_id"] = id;
                                post["text"] = post["text"];
                                post["nickname"] = post["nickname"];

                                this.setData({
                                    list: [...this.data.list, post]
                                })
                            },
                            fail: err => {
                                console.log(err)
                            }
                        })
                    })
                }
            },
            fail: err => {
                console.log(err)
                wx.showToast({
                    title: 'Failed to load posts!',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    
    onScrollToLower() {
        if (!this.data.isEnd)
        {
            this.getPostList();
        }
    },

    refreshEvent: function() {
        if (!this.data.isEnd)
        {
            this.getPostList();
            wx.stopPullDownRefresh();
        }
    },
    
    binderror(event) {
        this.setData({
          error: '错误'//event.detail.errMsg
        })
    },

    navigateToDetail(event) {
        const postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: `/pages/detail/detail?post_id=${postId}`
        });
    },
    
    wxNavAction() {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      },
     /* 生命周期函数--监听页面加载
     */
    onLoad: function(e) {
        // checkUserVerification().then(res => {
        //     if (res && res.is_valid) {
        //         this.setData({
        //             is_verified: res.is_valid
        //         })
        //     }
        // }).catch(e => {
        //     console.log(e);
        // })
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
        this.getPostList();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.setData({
            offset: 0,
            list: [],
            isEnd: false,
        })
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