getApp();

var t = require("../utils/api"), a = require("../utils/util"), e = function() {
    var e = this;
    a.request(t.optionsListUrl).then(function(t) {
        var a = {};
        a.cats = t.data, a.hotload = !1, e.setData(a);
    });
}, i = function() {
    if (null != this.data.imageAvatar) if (null != this.data.imageSubject) if ("" != this.data.circleName) if ("" != this.data.circleDesc) if (this.data.protocolChecked) {
        wx.showLoading({
            title: "提交中..."
        });
        var e = {
            id: this.data.id,
            circle_name: this.data.circleName,
            circle_introduce: this.data.circleDesc,
            head_portrait: this.data.imageAvatar,
            background_maps: this.data.imageSubject,
            plate_id: this.data.parent
        };
        a.request(t.addCircleUrl, e, "POST").then(function(t) {
            wx.hideLoading(), wx.showModal({
                title: "提交成功",
                content: "轻航审帖员会在24小时内为您处理，请您耐心等待！",
                showCancel: !1,
                confirmText: "朕知道了",
                confirmColor: "#333333",
                success: function(t) {
                    wx.navigateBack();
                }
            });
        });
    } else wx.showToast({
        title: "请阅读并同意圈主协议",
        icon: "none"
    }); else wx.showToast({
        title: "请输入圈子简介",
        icon: "none"
    }); else wx.showToast({
        title: "请输入圈子名称",
        icon: "none"
    }); else wx.showToast({
        title: "请上传圈子封面",
        icon: "none"
    }); else wx.showToast({
        title: "请上传圈子头像",
        icon: "none"
    });
}, s = function() {
    var e = this;
    a.request(t.plateListUrl).then(function(t) {
        var a = {};
        a.cats = e.data.cats.concat(t.data), e.setData(a);
    });
}, c = function(e) {
    var i = this;
    a.request(t.circleByplateidUrl, {
        plate_id: e
    }).then(function(t) {
        var a = {};
        a.subcats = t.data, a.subcatsloading = !1, i.setData(a);
    });
}, o = function(e) {
    var i = this;
    a.request(t.circleSearchUrl, {
        keyword: e
    }).then(function(t) {
        var a = {};
        a.keywordSubcats = t.data.data, a.keywordSubcatsloading = !1, i.setData(a);
    });
}, n = function() {
    var e = this;
    a.request(t.circleRecommendUrl).then(function(t) {
        var a = {};
        a.toplist = t.data, a.topload = !1, e.setData(a);
    });
}, r = function() {
    var e = this;
    a.request(t.circleNotUrl).then(function(t) {
        var a = {};
        a.notlist = t.data, a.hotload = !1, e.setData(a);
    });
}, l = function(e) {
    var i = this;
    a.request(t.circleCircleAndPostsUrl, {
        page: e
    }).then(function(t) {
        var a = t.data.data, e = {};
        0 == a.length ? e.isLastPage = !0 : (e.subcats = i.data.subcats.concat(a), e.page = t.data.current_page, 
        e.subcatsloading = !1, e.loadmoreShow = !1), e.isPullDownRefresh = !0, i.setData(e);
    });
}, d = function(e) {
    var i = this;
    a.request(t.userFollowCircleListUrl, {
        page: e
    }).then(function(t) {
        var a = t.data.data, s = {};
        0 == a.length ? (s.isLastPage = !0, 1 == e && (s.subcatsloading = !1)) : (a.length < 10 && (s.isMore = !0), 
        s.uSubcats = i.data.uSubcats.concat(a), s.uPage = t.data.current_page, s.subcatsloading = !1, 
        s.loadmoreShow = !1), s.isPullDownRefresh = !0, i.setData(s);
    });
}, u = function(t) {
    var a = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/pages/circle/list?id=" + a
    });
}, h = function(e) {
    var i = this;
    a.request(t.circleInfoUrl, {
        circle_id: e
    }).then(function(t) {
        var a = {};
        a.circleInfo = t.data, i.setData(a);
    });
}, f = function(e) {
    var i = this;
    a.request(t.userFollowCircleUrl, {
        circle_id: e.currentTarget.dataset.id
    }, "POST").then(function(t) {
        if (t.status) {
            var a = i.data.circleInfo;
            a.is_follow_circle = !a.is_follow_circle, i.setData({
                circleInfo: a
            }), a.is_follow_circle ? wx.showToast({
                title: "关注成功",
                icon: "none",
                duration: 1500
            }) : wx.showToast({
                title: "取消关注成功",
                icon: "none",
                duration: 1500
            });
        }
    });
}, g = function(e, i, s) {
    var c = this;
    a.request(t.postsByCircleIdUrl, {
        circle_id: e,
        type: i,
        page: s
    }).then(function(t) {
        if (200 === t.code) {
            var a = t.data, e = {};
            a.data.length <= 0 && 1 == s && (e.isNul = !0), 0 == a.data.length ? e.isLastPage = !0 : 0 == i ? (e.postsList = c.data.postsList.concat(a.data), 
            e.postsPage = a.current_page) : 1 == i && (e.newPostsList = c.data.newPostsList.concat(a.data), 
            e.newPostsPage = a.current_page), e.posts = c.data.posts.concat(a.data), c.data.topicload && (e.isPullDownRefresh = !0), 
            e.topicload = !1, c.setData(e);
        }
    });
}, p = function() {
    var e = this, i = e.data.isPosts, s = e.data.postsId, c = e.data.postsIndex, o = e.data.reject_msg;
    a.request(t.userAuditPostsUrl, {
        id: s,
        type: i,
        reject_msg: o
    }, "POST").then(function(t) {
        if (t.status) {
            var a = {}, i = e.data.posts;
            i.splice([ c ], 1), a.posts = i, a.showDialog = !1, a.isRejected = !1, e.setData(a), 
            wx.showToast({
                title: "操作成功！",
                icon: "none"
            });
        }
    });
}, w = function(e) {
    var i = this;
    a.request(t.circleInfoUrl, {
        circle_id: e
    }).then(function(t) {
        var a = i.data.cats, e = {};
        for (var s in e.id = t.data.id, e.imageAvatar = t.data.head_portrait, e.imageSubject = t.data.background_maps, 
        e.circleName = t.data.circle_name, e.circleDesc = t.data.circle_introduce, e.nameLength = t.data.circle_name.length, 
        e.descLength = t.data.circle_introduce.length, e.parent = t.data.plate_id, a) a[s].id == t.data.plate_id && (e.index = s);
        i.setData(e);
    });
}, v = function(e) {
    var i = this;
    a.request(t.getCircleUserListUrl, {
        circle_id: e
    }).then(function(t) {
        if (t.status) {
            var a = {};
            a.circleUser = t.data, i.setData(a);
        }
    });
};

module.exports = function(t) {
    t.getCircleUserList = v, t.geToptionsList = e, t.createCircle = i, t.plateList = s, 
    t.circleByplateid = c, t.circleSearch = o, t.circleRecommend = n, t.circleNot = r, 
    t.circleCircleAndPosts = l, t.userFollowCircleList = d, t.routeClubDetail = u, t.circleInfo = h, 
    t.quitCircle = f, t.postsByCircleId = g, t.userAuditPosts = p, t.editorCircleInfo = w;
};