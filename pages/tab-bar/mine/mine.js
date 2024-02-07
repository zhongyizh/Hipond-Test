var t = require("../../../mixins/user"), 
s = require("../../../mixins/common"), 
a = require("../../../mixins/pay"), 
u = require("../../../config/api"),
e = getApp(), 
o = {
    data: {
        cur_tabbar_index: 4,
        sysMessageCount: 0,
        statusBarHeight: e.globalData.statusBarHeight,
        userInfo: {},
        myPostsList: [],
        myLikePostsList: [],
        myCollectionList: [],
        myExceptionalList: [],
        myPostsPage: 1,
        myLikePostsPage: 1,
        myCollectionPage: 1,
        myExceptionalPage: 1,
        isNul: !1,
        isPullDownRefresh: !1,
        taga: [ {
            text: "动态",
            ums: ""
        }, {
            text: "收藏",
            ums: ""
        } ],
        currentItem: 0,
        navbarTrans: 0,
        color: "0,0,0",
        iconTheme: "white",
        iconLeft: "/image/notification.png",
        emptyTxt: "空",
        posts: [],
        topicload: !0,
        imageShow: !1,
        configData: {},
        isOnShow: !1,
        focus: !1,
        isCommentPage: !1,
        inputValue: "",
        imageValue: "",

        scrollHeight: wx.getSystemInfoSync().windowHeight + 150,
        crossAxisCount: 2,
        crossAxisGap: 8,
        mainAxisGap: 8,
        offset: 0,
        isEnd: false,
    },
    onLoad() {
      if (typeof this.getTabBar === 'function') {
        this.getTabBar((tabBar) => {
          tabBar.setData({
            selected: this.data.cur_tabbar_index
          })
        })
      };
      this.getMyPosts();
      this.getMyProfile();
    },

    onPageScroll: function(t) {
        var s = (t.scrollTop > 55 ? 55 : t.scrollTop) / 55, a = "#ffffff", e = this.data.iconTheme, o = this.data.iconLeft;
        s <= 0 ? (a = "#ffffff", "#000000", e = "white", o = "/image/notification.png") : s >= .4 && (a = "#000000", 
        "#ffffff", e = "black", o = "/image/notification-line.png"), this.setData({
            navbarTrans: s,
            iconTheme: e,
            iconLeft: o
        }), wx.setNavigationBarColor({
            frontColor: a,
            backgroundColor: a,
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
    },
    
    select: function(t) {
        var s = t.target.dataset.index, a = "空";
        0 != s && (a = "干净清爽"), this.setData({
            currentItem: s,
            emptyTxt: a,
            isNul: !1,
            topicload: !0,
            loadmoreShow: !1,
            isLastPage: !1
        });
        var e = {};
        0 == s ? this.data.myPostsList.length <= 0 ? (e.posts = [], this.userPosts(s, this.data.myPostsPage)) : e.posts = this.data.myPostsList : 1 == s ? this.data.myLikePostsList.length <= 0 ? (e.posts = [], 
        this.userPosts(s, this.data.myLikePostsPage)) : e.posts = this.data.myLikePostsList : 2 == s ? this.data.myCollectionList.length <= 0 ? (e.posts = [], 
        this.userPosts(s, this.data.myCollectionPage)) : e.posts = this.data.myCollectionList : 3 == s && (this.data.myExceptionalList.length <= 0 ? (e.posts = [], 
        this.userPosts(s, this.data.myExceptionalPage)) : e.posts = this.data.myExceptionalList), 
        e.topicload = !1, this.setData(e);
    },
    addTap: function() {
        wx.navigateTo({
            url: "/pages/create/index/create"
        });
    },
    
    getMyProfile: function() {
        wx.request({
            url: u.userInfoUrl,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: res => {
                const profile = res.data;
                console.log("const profile = res.data:", profile);
                var profile_viewModel = {};
                profile_viewModel["user_avatar"] = profile["avatar_url"];
                profile_viewModel["user_name"] = profile["nickname"];
                profile_viewModel["user_introduce"] = "我的常驻地：待填写";
                profile_viewModel["user_background_maps"] = "https://static.boredpanda.com/blog/wp-content/uploads/2021/06/60d4800281b8a_7sdniu17y8671__700.jpg"
                this.setData({
                  userInfo: profile_viewModel
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
    getMyPosts: function() {
        wx.request({
            url: u.getMyPostsUrl,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: res => {
                const postIds = res.data
                console.log("mine.js: fetchMyPosts(): User post list IDs fetched:");
                console.log(postIds);
                if (postIds.post_ids.length == 0) {
                    console.log("mine.js: fecthMyPosts(): the user has no posts, will show empty list.")
                    return;
                }
                this.setData({
                    taga: [{
                      text: "动态",
                      ums: postIds.post_ids.length
                    }, {
                      text: "收藏",
                      ums: "0"
                    }]
                });
                // request details for each post
                postIds["post_ids"].forEach(id => {
                    wx.request({
                        url: u.postsDetailUrl + '/' + id,
                        method: 'GET',
                        success: (res) => {
                            var res_post = res.data;
                            console.log("original post model", res.data);
                            var post_viewmodel = {};
                            post_viewmodel["post_id"] = id;
                            post_viewmodel["text"] = res_post["text"];
                            post_viewmodel["nickname"] = res_post["nickname"];
                            post_viewmodel["likes"] = res_post["likes"];
                            post_viewmodel["image_urls"] = res_post["image_urls"];
                            console.log("mine.js: fetchMyPosts(): User posts 本体 fetched:", post_viewmodel);
                            this.setData({
                                posts: [...this.data.posts, post_viewmodel],
                                topicload: 0
                            });
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
    onPullDownRefresh: function() {
        var t = this;
        t.updateUserInfo(), t.setData({
            posts: [],
            myPostsList: [],
            myLikePostsList: [],
            myCollectionList: [],
            myExceptionalList: [],
            topicload: !0,
            loadmoreShow: !1,
            isLastPage: !1,
            isNul: !1
        }), t.userPosts(t.data.currentItem, 1), t.userTotalPost(), setTimeout(function() {
            t.setData({
                userInfo: wx.getStorageSync("userInfo")
            });
        }, 500), t.data.isPullDownRefresh && (wx.hideNavigationBarLoading(), wx.stopPullDownRefresh());
    },
    onReachBottom: function() {
        var t = this.data.currentItem;
        this.setData({
            loadmoreShow: !0,
            isLastPage: !1
        });
        var s = 1;
        0 == t ? s = this.data.myPostsPage + 1 : 1 == t ? s = this.data.myLikePostsPage + 1 : 2 == t ? s = this.data.myCollectionPage + 1 : 3 == t && (s = this.data.myExceptionalPage + 1), 
        this.userPosts(t, s);
    },
    onShareAppMessage: function() {
        return "button" == res.from ? {
            title: "海塘",
            path: "/pages/sticky/sticky?id=" + this.data.postsId,
            imageUrl: ""
        } : {
            title: "海塘",
            path: "/pages/tab-bar/mine/mine",
            imageUrl: ""
        };
    }
};

a(o), t(o), s(o), Page(o);