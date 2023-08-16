const { listPostsUrl, detailsUrl } = require("../../../utils/api");

// pages/tab-bar/index.js
Page({
    data: {
        list: [],
        cur_tabbar_index: 0,
        crossAxisCount: 2,
        crossAxisGap: 10,
        mainAxisGap: 0
    },

    getPostList() {
        // Load all posts from backend
        wx.request({
            url: listPostsUrl,
            method: 'GET',
            success: res => {
                const postIds = res.data.post_ids
                // request details for each post
                postIds.forEach(id => {
                    wx.request({
                        url: detailsUrl + '/' + id,
                        method: 'GET',
                        success: (res) => {
                            var post = res.data;
                            console.log(post);
                            post["post_id"] = id;
    
                            this.setData({
                                list: [...this.data.list, post]
                            })
                        },
                        fail: err => {
                            console.log(err)
                        }
                    })
                })
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

    bindPreviewTap(event) {
        wx.previewImage({
          urls: event.currentTarget.dataset.imageUrls,
        })
    },

    bindscrolltolower() {
        this.setData({
          list: this.data.list.concat(getPostList())
        })
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
        this.getPostList();
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