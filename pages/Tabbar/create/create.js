var t = require("../../../mixins/common"), e = require("../../../mixins/forum"), a = (getApp(), 
{
    data: {
        type: "forums",
        menus: [ {
            id: 0,
            icon: "/image/image-line.png",
            text: "图片"
        }, {
            id: 1,
            icon: "/image/live-line.png",
            text: "视频"
        }, {
            id: 2,
            icon: "/image/link.png",
            text: "连接"
        }, {
            id: 3,
            icon: "/image/goods.png",
            text: "商品"
        } ],
        mediaType: -1,
        pictureMax: 9,
        format: "standard",
        image_urls: [],
        tags: [],
        goods: [],
        location: {},
        textinput: "",
        textLength: 0,
        textLengthMix: 1e3,
        topicids: "",
        topic: "",
        video_url: "",
        video_thumb_url: "",
        video_height: 0,
        video_width: 0,
        locationState: !0,
        linkPopup: !1,
        linkName: "",
        linkAdds: "https://",
        cursor: 0
    },
    onLoad: function(t) {
        "undefined" != t.type && (1 == t.type ? (this.setData({
            format: "standard"
        }), this.uploadPictures(2, "url")) : 2 == t.type && (this.uploadPictures(3, "video_url"), 
        this.setData({
            format: "video"
        })));
    },
    onMenuItem: function(t) {
        if (this.data.user) {
            var e = t.currentTarget.dataset.index;
            switch (this.data.menus[e].id) {
              case 0:
                this.setData({
                    format: "standard"
                }), this.uploadPictures(2, "url");
                break;

              case 1:
                this.uploadPictures(3, "video_url"), this.setData({
                    format: "video"
                });
                break;

              case 2:
                this.toAddLink();
                break;

              case 3:
                this.toAddGoods();
                break;

              default:
                console.log("发生了一个意料之外的错误");
            }
        } else wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    onShow: function() {
        var t = wx.getStorageSync("userSelectedCircle"), e = wx.getStorageSync("userInfo");
        e ? (this.setData({
            user: e,
            tags: wx.getStorageSync("userSelectedTags"),
            goods: wx.getStorageSync("postsGoods")
        }), "" != t && this.setData({
            topicids: t.id,
            topic: t.name
        })) : (wx.showToast({
            title: "请先登录"
        }), wx.navigateTo({
            url: "/pages/login/login"
        }));
    },
    toAddGoods: function() {
        wx.navigateTo({
            url: "/pages/create/goods/goods"
        });
    },
    delGoods: function(t) {
        var e = t.currentTarget.dataset.idx, a = this.data.goods;
        a.splice(e, 1), this.setData({
            goods: a
        }), wx.setStorageSync("postsGoods", a);
    },
    onContentInput: function(t) {
        this.setData({
            textLength: t.detail.value.length,
            textinput: t.detail.value,
            cursor: t.detail.cursor
        });
    },
    toAddLink: function() {
        this.setData({
            linkPopup: !this.data.linkPopup
        });
    },
    onLinkInput: function(t) {
        var e = {};
        0 == t.currentTarget.dataset.type ? e.linkName = t.detail.value : e.linkAdds = t.detail.value, 
        this.setData(e);
    },
    bCursor: function(t) {
        this.setData({
            cursor: t.detail.cursor
        });
    },
    openAddLink: function() {
        var t = this.data.textinput, e = this.data.linkName, a = this.data.linkAdds;
        if ("" != e && null != e) if ("" != a && "https://" != a && null != a) {
            var i = this.data.cursor, o = "";
            if (console.log("😁", i, t.length), 0 == i) o += '<a href="' + a + '">' + e + "</a>"; else if (i >= t.length) o += t + '<a href="' + a + '">' + e + "</a>"; else for (var s = 0; s < t.length; s++) s == i && (o += '<a href="' + a + '">' + e + "</a>"), 
            o += t[s];
            this.setData({
                textinput: o,
                linkPopup: !this.data.linkPopup,
                linkName: "",
                linkAdds: "https://"
            });
        } else wx.showToast({
            title: "请填写链接地址",
            icon: "none"
        }); else wx.showToast({
            title: "请填写链接显示名称",
            icon: "none"
        });
    },
    addPictures: function() {
        var t = 9 - this.data.image_urls.length;
        this.uploadPictures(2, t);
    },
    onPictureDelete: function(t) {
        var e = t.currentTarget.dataset.index;
        this.data.image_urls.splice(e, 1), 0 == this.data.image_urls.length && (this.data.mediaType = -1), 
        this.setData({
            mediaType: this.data.mediaType,
            image_urls: this.data.image_urls
        });
    },
    onVideoDelete: function() {
        this.setData({
            mediaType: -1,
            video_url: "",
            video_thumb_url: "",
            video_height: 0,
            video_width: 0
        });
    },
    onTopicClick: function() {
        wx.navigateTo({
            url: "/pages/create/circle/circle"
        });
    },
    onLocationClick: function() {
        var t = this;
        this.checkPermission("scope.userLocation", "请到设置页面授权“位置信息”权限", function() {
            t.startChooseLocation();
        });
    },
    startChooseLocation: function() {
        var t = this;
        wx.chooseLocation({
            success: function(e) {
                var a = {};
                a.latitude = e.latitude, a.longitude = e.longitude, a.address_name = e.address, 
                a.address_detailed = e.name, t.setData({
                    location: a,
                    locationState: !1
                });
            }
        });
    },
    delAddsTap: function() {
        this.setData({
            location: {},
            locationState: !0
        });
    },
    onTagClick: function() {
        wx.navigateTo({
            url: "/pages/create/tags/tags"
        });
    },
    toGoodsDetails: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/goods-details/goods-details?id=" + e
        });
    }
});

t(a), e(a), Page(a);