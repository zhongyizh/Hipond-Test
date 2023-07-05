getApp();

var t = require("../config/api"), e = require("../utils/util"), a = function(a) {
    var i = this;
    e.request(t.tagsAddUrl, {
        tags_name: a
    }, "POST").then(function(t) {
        var e = wx.getStorageSync("userSelectedTags"), a = !0;
        if (e.length > 0) for (var s = 0; s < e.length; s++) if (e[s].id == t.data.id) {
            a = !1, wx.showToast({
                title: "您已经添加过该标签了",
                icon: "none"
            });
            break;
        }
        if (a) {
            var o = {};
            o.id = t.data.id, o.tags_name = t.data.tags_name, e.unshift(o), wx.setStorageSync("userSelectedTags", e), 
            i.setData({
                searchInput: "",
                userSelectedTags: e
            });
        }
    });
}, i = function(a) {
    var i = this;
    e.request(t.tagsRecommendUrl).then(function(t) {
        var e = {};
        t.data.length <= 0 && (e.isNull = !1), e.tags = t.data, i.setData(e);
    });
}, s = function() {
    var a = this.data.textinput, i = this.data.topicids, s = this.data.tags, o = this.data.goods, n = this.data.location, d = this.data.image_urls, r = this.data.video_url, h = this.data.video_thumb_url, u = this.data.video_height, c = this.data.video_width;
    "" != a ? "" != i && null != i ? (wx.showLoading({
        title: "发布中..."
    }), e.request(t.postAddUrl, {
        posts_content: a,
        circle_id: i,
        tags: s,
        goods: o,
        address: n,
        image_urls: d,
        video_url: r,
        video_thumb_url: h,
        video_height: u,
        video_width: c
    }, "POST").then(function(t) {
        wx.hideLoading(), 200 == t.code && wx.showModal({
            title: "发布成功",
            content: "我们会在24小时内您审帖，请您耐心等待！",
            showCancel: !1,
            confirmText: "朕知道了",
            confirmColor: "#333333",
            success: function(t) {
                wx.navigateBack();
            }
        });
    })) : wx.showToast({
        title: "请选择一个圈子再发布吧",
        icon: "none"
    }) : wx.showToast({
        title: "还没有说点什么呢",
        icon: "none"
    });
};

module.exports = function(t) {
    t.getTagList = i, t.getAddTagList = a, t.createForums = s;
};