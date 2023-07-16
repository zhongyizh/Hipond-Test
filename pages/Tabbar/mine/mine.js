var t = require("../../../mixins/user"), s = require("../../../mixins/common"), a = require("../../../mixins/pay"), e = getApp(), o = {
    data: {
        sysMessageCount: 0,
        statusBarHeight: e.globalData.statusBarHeight,
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
        imageValue: ""
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
    
    popupShowTap: function(t) {
        this.setData({
            typeShow: t.currentTarget.dataset.type,
            imageShow: !this.data.imageShow
        });
    },
    toVipTap: function() {
        this.setData({
            isOnShow: !0
        }), wx.navigateTo({
            url: "/pages/mine/members/members"
        });
    },
    toMessage: function() {
        wx.navigateTo({
            url: "/pages/notice/notice"
        });
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
            title: "轻航",
            path: "/pages/sticky/sticky?id=" + this.data.postsId,
            imageUrl: ""
        } : {
            title: "轻航",
            path: "/pages/Tabbar/mine/mine",
            imageUrl: ""
        };
    }
};

a(o), t(o), s(o), Page(o);