getApp();

var t = require("../config/api"), e = require("../utils/util"), a = function() {
    var a = this;
    e.request(t.getMessagesUrl).then(function(t) {
        var e = a.data.messageQHList;
        e[0].content = t.data[0].noticeSystemText, e[0].date = t.data[0].noticeSystemDate, 
        e[0].count = t.data[0].noticeSystemCount, e[1].content = t.data[1].noticeLikeCollectText, 
        e[1].date = t.data[1].noticeLikeCollectDate, e[1].count = t.data[1].noticeLikeCollectCount, 
        e[2].content = t.data[2].noticeCommentText, e[2].date = t.data[2].noticeCommentDate, 
        e[2].count = t.data[2].noticeCommentCount;
        var s = {};
        s.messageQHList = e, a.setData(s);
    });
}, s = function(a) {
    var s = this;
    e.request(t.getDetailsMessagesUrl, {
        type: a,
        page: s.data.page
    }).then(function(t) {
        var e = t.data, a = {
            loadmore: !1
        };
        e.data.length > 0 ? a.messageList = s.data.messageList.concat(e.data) : "" == e.data && (a.isLastPage = !0, 
        1 == e.current_page && (a.isNull = !1)), a.page = e.current_page, s.setData(a);
    });
}, n = function(a) {
    e.request(t.readMessagesUrl, {
        type: a
    }).then(function(t) {});
}, i = function(t) {
    wx.navigateTo({
        url: "/pages/sticky/sticky?id=" + t.currentTarget.dataset.id
    });
}, o = function() {
    var a = this, s = a.data.chat_content;
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }, void 0 !== s && null != s && "" != s.trim() ? e.request(t.addChatUrl, {
        oid: a.data.oid,
        chat_content: s,
        chat_image: a.data.chat_image
    }, "POST").then(function(t) {
        t.status ? (a.setData({
            chat_content: "",
            chat_image: ""
        }), a.getUserChat(1)) : wx.showToast({
            title: "发送失败了!",
            icon: "none",
            duration: 1500
        });
    }) : wx.showToast({
        title: "不讲话，你发送个锤子",
        icon: "none"
    });
}, r = function() {
    var a = this;
    wx.chooseImage({
        count: 1,
        sourceType: [ "album", "camera" ],
        success: function(s) {
            var n = s.tempFilePaths;
            e.uploadFile(t.uploadsUrl, n[0]).then(function(t) {
                a.setData({
                    chat_image: t.data
                }), a.toAddChat();
            });
        }
    });
}, c = function(a) {
    var s = this;
    e.request(t.getUserChatUrl, {
        oid: s.data.oid,
        page: s.data.page
    }).then(function(t) {
        if (t.status) {
            1 == a && s.setData({
                page: 1,
                messages: []
            });
            var e = t.data;
            e.data.reverse();
            var n = {};
            n.messages = e.data.concat(s.data.messages), n.page = e.current_page, s.setData(n);
        }
    });
}, u = function() {
    var a = this;
    e.request(t.getUserChatListUrl).then(function(t) {
        if (t.status) {
            var e = {};
            e.messageList = t.data, a.setData(e);
        }
    });
}, d = function() {
    e.request(t.readUserChatUrl, {
        oid: this.data.oid
    }).then(function(t) {});
}, g = function(a) {
    var s = this;
    e.request(t.userDelMessageUrl, {
        userid: a.currentTarget.dataset.uid
    }).then(function(t) {
        s.setData({
            close: !0
        }), s.getUserChatList();
    });
};

module.exports = function(t) {
    t.delMessage = g, t.getMessages = a, t.getDetailsMessages = s, t.readMessages = n, 
    t.toPostsDetail = i, t.toAddChat = o, t.toAddChatImage = r, t.getUserChat = c, t.getUserChatList = u, 
    t.readUserChat = d;
};