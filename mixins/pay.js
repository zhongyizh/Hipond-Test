getApp();

var t = require("../config/api"), e = require("../utils/util"), n = function(t) {
    return new Promise(function(e, n) {
        wx.requestPayment({
            timeStamp: t.timeStamp,
            nonceStr: t.nonceStr,
            package: t.package,
            signType: t.signType,
            paySign: t.paySign,
            success: function(t) {
                e(t);
            },
            fail: function(t) {
                n(t);
            },
            complete: function(t) {
                n(t);
            }
        });
    });
}, o = function() {
    var n = this;
    e.request(t.orderUrl, {
        type: 1
    }, "POST").then(function(o) {
        o.status ? n.payOrder(o.data).then(function(n) {
            wx.showToast({
                title: "开通成功！",
                icon: "none",
                duration: 1500
            }), e.request(t.userInfoUrl).then(function(t) {
                wx.setStorageSync("userInfo", t.data), wx.navigateBack();
            });
        }).catch(function(t) {
            console.log("err", t);
        }) : wx.showToast({
            title: "发生了一个意料之外的错误，请联系官方客服进行反馈吧。",
            icon: "none",
            duration: 1500
        });
    });
}, a = function() {
    var n = this, o = n.data.rewardPrice, a = n.data.postsId, r = n.data.postsUserId;
    if (/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(o)) if (o < 1 || o > 1e3) wx.showToast({
        title: "打赏金额必须在1-1000",
        icon: "none"
    }); else {
        var i = {};
        i.rewardPrice = o, i.postsId = a, i.postsUserId = r, e.request(t.orderUrl, {
            type: 2,
            parame: i
        }, "POST").then(function(t) {
            t.status ? n.payOrder(t.data).then(function(t) {
                wx.showToast({
                    title: "打赏成功！",
                    icon: "none",
                    duration: 1500
                }), n.setData({
                    rewardPopup: !n.data.rewardPopup
                });
            }).catch(function(t) {
                console.log("err", t);
            }) : wx.showToast({
                title: "发生了一个意料之外的错误，请联系官方客服进行反馈吧。",
                icon: "none",
                duration: 1500
            });
        });
    } else wx.showToast({
        title: "请输入一个正确的打赏金额",
        icon: "none"
    });
};

module.exports = function(t) {
    t.payOrder = n, t.openMembershipAccount = o, t.openExceptionalAccount = a;
};