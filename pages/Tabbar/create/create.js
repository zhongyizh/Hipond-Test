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
        } ],
        mediaType: -1,
        pictureMax: 9,
        format: "standard",
        image_urls: [],
        tags: [],
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
    },
    onContentInput: function(t) {
        this.setData({
            textLength: t.detail.value.length,
            textinput: t.detail.value,
            cursor: t.detail.cursor
        });
    },
    bCursor: function(t) {
        this.setData({
            cursor: t.detail.cursor
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
});

t(a), e(a), Page(a);