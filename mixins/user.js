getApp();

var t = require("../utils/api"), a = require("../utils/util"), e = function() {
    var e = null, n = null;
    return new Promise(function(i, s) {
        return a.login().then(function(t) {
            n = t.code;
        }), a.getUserProfile().then(function(t) {
            return e = t.userInfo, a.getUserInfo();
        }).then(function(o) {
            a.request(t.loginUrl, {
                userInfo: e,
                encryptedData: o.encryptedData,
                iv: o.iv,
                code: n
            }, "POST").then(function(e) {
                200 === e.code ? (wx.setStorageSync("token", e.data.token), a.request(t.userInfoUrl).then(function(t) {
                    wx.setStorageSync("userInfo", t.data), i(t.data);
                })) : s(e);
            }).catch(function(t) {
                s(t);
            });
        }).catch(function(t) {
            s(t);
        });
    });
}, n = function() {
    a.request(t.userInfoUrl).then(function(t) {
        wx.setStorageSync("userInfo", t.data);
    });
}, i = function(e) {
    var i = {
        user_avatar: this.data.avatar,
        user_name: this.data.nickName,
        user_introduce: this.data.signature,
        user_birthday: this.data.birth,
        user_background_maps: this.data.imagesubject
    };
    a.request(t.updateInfoUrl, i, "POST").then(function(t) {
        if (t.status) return wx.hideLoading(), wx.showToast({
            title: "保存成功！审核中...",
            icon: "none"
        }), n();
    });
}, s = function(e, n) {
    var i = this;
    a.request(t.userPostsUrl, {
        type: e,
        page: n
    }).then(function(t) {
        if (t.status) {
            var a = t.data, s = {};
            a.data.length <= 0 && 1 == n && (s.isNul = !0), 0 == a.data.length ? s.isLastPage = !0 : 0 == e ? (s.myPostsList = i.data.myPostsList.concat(a.data), 
            s.myPostsPage = a.current_page) : 1 == e ? (s.myLikePostsList = i.data.myLikePostsList.concat(a.data), 
            s.myLikePostsPage = a.current_page) : 2 == e ? (s.myCollectionList = i.data.myCollectionList.concat(a.data), 
            s.myCollectionPage = a.current_page) : 3 == e && (s.myExceptionalList = i.data.myExceptionalList.concat(a.data), 
            s.myExceptionalPage = a.current_page), s.posts = i.data.posts.concat(a.data), i.data.topicload && (s.isPullDownRefresh = !0), 
            s.topicload = !1, i.setData(s);
        }
    });
}, o = function() {
    var e = this.data.feedback_content;
    "" != e && null != e ? a.request(t.userFeedbackUrl, {
        feedback_type: this.data.feedback_type,
        feedback_content: e
    }, "POST").then(function(t) {
        wx.hideLoading(), wx.showToast({
            title: "反馈成功！",
            icon: "none"
        });
    }) : wx.showToast({
        title: "您还没有填写您的问题和意见哦！",
        icon: "none"
    });
}, r = function() {
    var e = this;
    a.request(t.userAuthenticationUrl).then(function(t) {
        var a = {};
        null == t.data || "" == t.data ? a.isA = !1 : a.isA = !0, a.alist = t.data, a.swiperload = !1, 
        e.setData(a);
    });
}, c = function() {
    var e = this.data.name, n = this.data.phone, i = this.data.desc, s = this.data.imagesubject;
    "" != e && null != e ? "" != n && null != n ? "" != i && null != i ? null != s ? a.request(t.userAuthenticationUrl, {
        name: e,
        contact_information: n,
        introduce: i,
        identity_picture: s
    }, "POST").then(function(t) {
        return wx.hideLoading(), wx.showToast({
            title: "提交成功！",
            icon: "none"
        }), r();
    }) : wx.showToast({
        title: "请上传身份信息证明图片",
        icon: "none"
    }) : wx.showToast({
        title: "请填写介绍",
        icon: "none"
    }) : wx.showToast({
        title: "请填写联系方式",
        icon: "none"
    }) : wx.showToast({
        title: "请填写名称",
        icon: "none"
    });
}, u = function() {
    var e = this;
    a.request(t.userCricleUrl).then(function(t) {
        var a = {};
        a.subcats = t.data, a.subcatsloading = !1, e.setData(a);
    });
}, d = function() {
    var e = this;
    a.request(t.userTotalPostUrl).then(function(t) {
        var a = {}, n = e.data.taga;
        n[0].ums = t.data.myTotal, n[1].ums = t.data.collecTotal, n[2].ums = t.data.likeTotal, 
        n[3].ums = t.data.exceptionalTotal, a.taga = n, e.setData(a);
    });
}, l = function() {
    var e = this, n = t.followUserUrl;
    1 == e.data.type && (n = t.fansUserUrl), a.request(n, {
        user_id: e.data.userid,
        page: e.data.page
    }).then(function(t) {
        var a = t.data, n = {};
        a.data.length <= 0 && (n.isLastPage = !0), n.userList = e.data.userList.concat(a.data), 
        n.loadmore = !1, n.page = a.current_page, e.setData(n);
    });
}, h = function() {
    var e = this;
    a.request(t.getUserinfoByIdUrl, {
        user_id: e.data.userId
    }).then(function(t) {
        var a = {};
        a.userInfo = t.data, e.setData(a);
    });
}, f = function() {
    var e = this;
    a.request(t.userPostsByIdUrl, {
        page: e.data.page,
        user_id: e.data.userId
    }).then(function(t) {
        var a = t.data, n = {};
        a.data.length < 6 && (n.isLastPage = !0), n.posts = e.data.posts.concat(a.data), 
        n.topicload = !1, n.page = a.current_page, n.total = a.total, e.setData(n);
    });
}, g = function() {
    var e = this;
    a.request(t.getMembersPriceUrl).then(function(t) {
        var a = {};
        t.status ? a.order_price = t.data : a.order_price = 999, e.setData(a);
    });
}, p = function() {
    var e = this;
    a.request(t.configDatalUrl).then(function(t) {
        if (t.status) {
            var a = {};
            a.configData = t.data, e.setData(a);
        }
    });
}, w = function() {
    var e = this;
    a.request(t.myOrderUrl, {
        page: e.data.page
    }).then(function(t) {
        if (t.status) {
            var a = t.data, n = {};
            a.data.length < 10 && (n.isLastPage = !0), n.loading = !1, n.orderList = e.data.orderList.concat(a.data), 
            n.page = a.current_page, e.setData(n);
        }
    });
}, m = function() {
    var e = this;
    a.request(t.myFinancialUrl).then(function(t) {
        if (t.status) {
            var a = t.data, n = {}, i = e.data.withdrawal;
            n.sumPrice = a.sum_price, n.bankName = a.bank_name, n.bankId = a.bank_card, i[0].i = a.earnings_yesterday, 
            i[1].i = a.balance, i[2].i = a.withdrawal_price, n.withdrawal = i, n.withdrawalBalance = a.balance, 
            e.setData(n);
        }
        e.animate();
    });
}, y = function() {
    var e = this;
    a.request(t.myUserWithdrawalUrl).then(function(t) {
        if (t.status) {
            var a = {};
            t.data.length <= 0 && (a.isWithdrawal = !1), a.withdrawalList = t.data, e.setData(a);
        }
    });
}, v = function() {
    var e = this;
    a.request(t.myUserExceptionalUrl).then(function(t) {
        if (t.status) {
            var a = {};
            t.data.length <= 0 && (a.isExceptional = !1), a.exceptionalList = t.data, e.setData(a);
        }
    });
}, U = function() {
    var e = this, n = e.data.price, i = e.data.bankName, s = e.data.bankId;
    "" != n && null != n ? "" != i && null != i ? "" != s && null != s ? a.request(t.initiateWithdrawalUrl, {
        price: n,
        bank_name: i,
        bank_card: s
    }, "POST").then(function(t) {
        t.status && wx.showModal({
            title: "发起提现成功",
            content: "轻航会在1至3个工作日内您受理，请您耐心等待！",
            showCancel: !1,
            confirmText: "朕知道了",
            confirmColor: "#333333",
            success: function(t) {
                e.setData({
                    withdrawalPopup: !e.data.withdrawalPopup
                }), e.myFinancial(), e.myUserWithdrawal();
            }
        });
    }) : wx.showToast({
        title: "请输入银行卡号！",
        icon: "none"
    }) : wx.showToast({
        title: "请输入支行名称！",
        icon: "none"
    }) : wx.showToast({
        title: "请选择提现金额！",
        icon: "none"
    });
}, P = function() {
    var e = this;
    a.getNewToken().then(function() {
        a.request(t.pcLoginUrl, {
            token: wx.getStorageSync("token"),
            scene: e.data.scene
        }).then(function(t) {
            e.setData({
                btnState: !1
            }), wx.reLaunch({
                url: "/pages/tabbar/index/index"
            });
        });
    });
};

module.exports = function(t) {
    t.pcLogin = P, t.myUserExceptional = v, t.myUserWithdrawal = y, t.myFinancial = m, 
    t.myOrder = w, t.withdrawalPay = U, t.loginByWeixin = e, t.updateInfo = i, t.userPosts = s, 
    t.userTotalPost = d, t.updateUserInfo = n, t.userFeedback = o, t.addAuthentication = c, 
    t.userAuthentication = r, t.userCricle = u, t.followUserList = l, t.getUserinfoById = h, 
    t.userPostsById = f, t.getMembersPrice = g, t.configData = p;
};