var t = require("../@babel/runtime/helpers/defineProperty"), e = require("../utils/api"), a = require("../utils/util"), s = require("../components/poster/poster/poster"), n = (getApp(), 
function() {
    return new Promise(function(t, s) {
        a.request(e.getSysMessageCountUrl).then(function(e) {
            t(e.data);
        });
    });
}), o = function(e) {
    var a = this;
    wx.chooseImage({
        count: 1,
        sourceType: [ "album", "camera" ],
        success: function(s) {
            var n = s.tempFilePaths;
            a.setData(t({
                pic: n[0]
            }, e, !0));
        }
    });
}, i = function(s, n, o) {
    var i = this;
    wx.showLoading(), a.uploadFile(e.uploadsUrl, s).then(function(e) {
        var a, s = (t(a = {}, n, e.data), t(a, o, !1), t(a, "imagesubjectClipper", !1), 
        a);
        i.setData(s), wx.hideLoading();
    });
}, r = function(s, n) {
    var o = this;
    1 === s ? wx.chooseImage({
        count: 1,
        sourceType: [ "album", "camera" ],
        success: function(s) {
            wx.showLoading();
            var i = s.tempFilePaths;
            a.uploadFile(e.uploadsUrl, i[0]).then(function(e) {
                var a = t({}, n, e.data);
                o.setData(a), wx.hideLoading();
            });
        },
        fail: function(t) {
            console.log("err", t);
        }
    }) : 2 === s ? wx.chooseImage({
        count: n,
        sourceType: [ "album", "camera" ],
        success: function(t) {
            wx.showLoading();
            var s = t.tempFilePaths;
            for (var n in s) a.uploadFile(e.uploadsUrl, s[n]).then(function(t) {
                var e = o.data.image_urls, a = {};
                a.url = t.data, e.push(a), o.setData({
                    image_urls: e,
                    mediaType: 0
                }), wx.hideLoading();
            });
        },
        fail: function(t) {
            console.log("err", t);
        }
    }) : 3 === s && wx.chooseMedia({
        mediaType: [ "video" ],
        sourceType: [ "album", "camera" ],
        maxDuration: 60,
        camera: "back",
        success: function(s) {
            wx.showLoading();
            var i = s.tempFiles[0];
            o.setData({
                video_height: i.height,
                video_width: i.width
            });
            var r = i.thumbTempFilePath;
            a.uploadFile(e.uploadsUrl, i.tempFilePath).then(function(s) {
                var i, d = (t(i = {}, n, s.data), t(i, "mediaType", 1), i);
                o.setData(d), a.uploadFile(e.uploadsUrl, r).then(function(t) {
                    o.setData({
                        video_thumb_url: t.data
                    }), wx.hideLoading();
                });
            });
        },
        fail: function(t) {
            console.log("err", t);
        }
    });
}, d = function(t, e, a) {
    wx.getSetting({
        success: function(s) {
            null == s.authSetting[t] ? wx.authorize({
                scope: t,
                success: function() {
                    a();
                },
                fail: function() {}
            }) : s.authSetting[t] ? a() : wx.showModal({
                title: "提示",
                content: e,
                success: function(t) {
                    t.confirm ? wx.openSetting({}) : t.cancel;
                }
            });
        }
    });
}, c = function() {
    var t = this;
    a.request(e.indexBannerUrl).then(function(e) {
        var a = {};
        a.banner = e.data, a.swiperload = !1, t.setData(a);
    });
}, u = function() {
    var t = this;
    a.request(e.indexPostsUrl, {
        page: t.data.page,
        type: t.data.type,
        plate_id: t.data.plateId
    }).then(function(e) {
        var a = e.data, s = {};
        0 == a.data.length ? s.isLastPage = !0 : (s.posts = t.data.posts.concat(a.data), 
        s.page = a.current_page, s.loadmoreShow = !1, s.isLastPage = !1), s.topicload = !1, 
        t.setData(s);
    });
}, l = function() {
    var t = this;
    a.request(e.indexChoicenessUrl).then(function(e) {
        var a = {};
        a.sticky = e.data, a.stickyload = !1, t.setData(a);
    });
}, h = function() {
    var t = this;
    a.request(e.tagsHotUrl).then(function(e) {
        var a = {};
        a.categoryMap = t.data.categoryMap.concat(e.data), t.setData(a);
    });
}, g = function(t) {
    wx.navigateTo({
        url: "/pages/sticky/sticky?id=" + t.currentTarget.dataset.id
    });
}, p = function(t) {
    var s = this;
    a.request(e.postsDetailUrl, {
        posts_id: t
    }).then(function(t) {
        if (t.status) {
            var e = {};
            e.posts = t.data, e.topicload = !1, s.setData(e);
        }
    });
}, m = function(t) {
    return new Promise(function(s, n) {
        a.request(e.userFollowUrl, {
            posts_user_id: t
        }, "POST").then(function(t) {
            t.status ? s(t) : n(t);
        });
    });
}, f = function(t) {
    var e = this, a = t.currentTarget.dataset.userid;
    m(a).then(function(t) {
        if (t.status) {
            var a = {}, s = e.data.userInfo;
            s.isFollow = !s.isFollow, a.userInfo = s, e.setData(a), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 1500
            });
        }
    });
}, w = function(t) {
    var e = this, a = t.currentTarget.dataset.userid, s = t.currentTarget.dataset.index;
    m(a).then(function(t) {
        if (t.status) {
            var a = {}, n = e.data.userList;
            n[s].is_together_follow = !n[s].is_together_follow, a.userList = n, e.setData(a), 
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 1500
            });
        }
    });
}, x = function() {
    var t = this, s = t.data.currentData;
    a.request(e.indexSearchUrl, {
        keyword: t.data.keyword,
        type: s,
        page: t.data.page
    }).then(function(e) {
        var a = e.data, n = {};
        a.data.length <= 0 && 1 == t.data.page && (n.isNull = !0), 0 == a.data.length ? n.isLastPage = !0 : 0 == s ? (n.posts = t.data.posts.concat(a.data), 
        n.postsPage = a.current_page) : 1 == s ? (n.cats = t.data.cats.concat(a.data), n.catsPage = a.current_page) : 2 == s && (n.userList = t.data.userList.concat(a.data), 
        n.userPage = a.current_page), n.topicload = !1, n.searchViewVisible = !1, t.setData(n);
    });
}, v = function() {
    var t = this;
    a.request(e.searchCountUrl, {
        keyword: t.data.keyword
    }).then(function(e) {
        var a = t.data.tabs;
        a[0].cont = e.data.posts_count, a[1].cont = e.data.circle_count, a[2].cont = e.data.user_count;
        var s = {};
        s.tabs = a, t.setData(s);
    });
}, T = function() {
    var t = this;
    a.request(e.searchHotListUrl).then(function(e) {
        var a = {};
        a.hots = e.data, t.setData(a);
    });
}, D = function() {
    var t = this;
    a.request(e.searchCarouselListUrl).then(function(e) {
        var a = {};
        a.searchText = e.data, t.setData(a);
    });
}, _ = function() {
    var t = this;
    a.request(e.postsTageUrl, {
        tag_id: t.data.tagid,
        page: t.data.page
    }).then(function(e) {
        var a = e.data, s = {};
        a.data.length > 0 ? s.posts = a.data : "" == a.data && (s.loadingShow = !0), s.page = a.current_page, 
        s.topicload = !1, t.setData(s), (a.data.length > 0 || t.data.empty) && wx.lin.renderWaterFlow(t.data.posts, t.data.empty);
    });
}, P = function() {
    var t = this;
    a.request(e.userPlateUrl).then(function(e) {
        var a = {};
        a.header = t.data.header.concat(e.data), t.setData(a);
    });
}, y = function(t) {
    var s = this, n = t.currentTarget.dataset.id, o = t.currentTarget.dataset.name;
    a.request(e.userPlateAddUrl, {
        plate_id: n
    }, "POST").then(function(t) {
        if (t.status) if (421001 == t.code) wx.showToast({
            title: t.message,
            icon: "none",
            duration: 1500
        }); else {
            var e = {}, a = {};
            a.plate_id = n, a.plate_name = o, e.header = s.data.header.concat(a), s.setData(e);
        } else wx.showToast({
            title: "遇到了一个未知错误，请联系轻航官方客服反馈！",
            icon: "none",
            duration: 1500
        });
    });
}, I = function(t) {
    var s = this, n = t.currentTarget.dataset.id, o = t.currentTarget.dataset.index;
    a.request(e.userPlateDeleteUrl, {
        id: n
    }, "POST").then(function(t) {
        if (t.status) {
            var e = {}, a = s.data.header;
            a.splice([ o ], 1), e.header = a, s.setData(e);
        } else wx.showToast({
            title: "遇到了一个未知错误，请联系轻航官方客服反馈！",
            icon: "none",
            duration: 1500
        });
    });
}, S = function(t) {
    var e = t.currentTarget.dataset.uid;
    wx.navigateTo({
        url: "/pages/user/user?id=" + e
    });
}, C = function() {
    var t = this;
    a.request(e.postsTageV2Url, {
        tag_id: t.data.id,
        page: t.data.page
    }).then(function(e) {
        var a = {};
        0 == e.data.data.length && (a.isLastPage = !0), a.posts = t.data.posts.concat(e.data.data), 
        a.topicload = !1, a.page = e.data.current_page, t.setData(a);
    });
}, b = function() {
    var t = this;
    a.request(e.getShopGoodsPostsListUrl, {
        gid: t.data.id,
        page: t.data.page
    }).then(function(e) {
        var a = {};
        0 == e.data.data.length && (a.isLastPage = !0), a.posts = t.data.posts.concat(e.data.data), 
        a.topicload = !1, a.page = e.data.current_page, t.setData(a);
    });
}, L = function(t) {
    var e = this, a = t.currentTarget.dataset.userid;
    m(a).then(function(t) {
        if (t.status) {
            var s = {}, n = e.data.posts;
            for (var o in n) n[o].user.id == a && (n[o].is_follow_user = !n[o].is_follow_user);
            s.posts = n, e.setData(s), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 1500
            });
        }
    });
}, U = function(t) {
    var s = this, n = t.currentTarget.dataset.id, o = t.currentTarget.dataset.index;
    a.request(e.postsLikeUrl, {
        posts_id: n
    }, "POST").then(function(t) {
        if (t.status) {
            var e = {}, a = s.data.posts;
            a[o].is_like ? a[o].like_count -= 1 : a[o].like_count += 1, a[o].is_like = !a[o].is_like, 
            e.posts = a, s.setData(e);
        }
    });
}, k = function() {
    var t = this;
    a.request(e.postsCollectUrl, {
        posts_id: t.data.postsId
    }, "POST").then(function(e) {
        if (e.status) {
            var a = {}, s = t.data.postsIndex, n = t.data.posts;
            n[s].is_collect = !n[s].is_collect, a.posts = n, a.showDialog = !t.data.showDialog, 
            t.setData(a), t.data.isCollect ? wx.showToast({
                title: "取消收藏成功",
                icon: "none",
                duration: 1500
            }) : wx.showToast({
                title: "收藏成功",
                icon: "none",
                duration: 1500
            });
        }
    });
}, q = function() {
    var t = this;
    a.request(e.postsDeleteUrl, {
        posts_id: t.data.postsId
    }, "POST").then(function(e) {
        if (e.status) {
            var a = {}, s = t.data.posts;
            s.splice([ t.data.postsIndex ], 1), a.posts = s, a.bounced = !t.data.bounced, t.setData(a);
        }
    });
}, F = function(t) {
    var s = this, n = t.currentTarget.dataset.cmtindex;
    a.request(e.commentLikeAddUrl, {
        comment_id: t.currentTarget.dataset.id
    }, "POST").then(function(t) {
        if (t.status) {
            var e = {}, a = s.data.comments;
            a[n].is_like ? a[n].like_count -= 1 : a[n].like_count += 1, a[n].is_like = !a[n].is_like, 
            e.comments = a, s.setData(e);
        }
    });
}, z = function(t) {
    var s = this, n = t.currentTarget.dataset.cmtindex, o = t.currentTarget.dataset.cmtindexs;
    a.request(e.commentLikeAddUrl, {
        comment_id: t.currentTarget.dataset.id
    }, "POST").then(function(t) {
        if (t.status) {
            var e = {}, a = s.data.comments;
            a[n].child[o].is_like ? a[n].child[o].like_count -= 1 : a[n].child[o].like_count += 1, 
            a[n].child[o].is_like = !a[n].child[o].is_like, e.comments = a, s.setData(e);
        }
    });
}, A = function(t) {
    var s = this;
    wx.showModal({
        title: "提示",
        content: "确定要删除您的这条评论吗？",
        success: function(n) {
            if (n.confirm) {
                var o = t.currentTarget.dataset.cmtindex;
                a.request(e.commentDeleteAddUrl, {
                    id: t.currentTarget.dataset.id
                }, "POST").then(function(t) {
                    if (t.status) {
                        var e = {}, a = s.data.comments;
                        a.splice([ o ], 1), e.comments = a, s.setData(e);
                    }
                });
            } else n.cancel;
        }
    });
}, R = function(t) {
    var s = this;
    wx.showModal({
        title: "提示",
        content: "确定要删除您的这条评论吗？",
        success: function(n) {
            if (n.confirm) {
                var o = t.currentTarget.dataset.cmtindex, i = t.currentTarget.dataset.cmtindexs;
                a.request(e.commentDeleteAddUrl, {
                    id: t.currentTarget.dataset.id
                }, "POST").then(function(t) {
                    if (t.status) {
                        var e = {}, a = s.data.comments;
                        a[o].child.splice([ i ], 1), e.comments = a, s.setData(e);
                    }
                });
            } else n.cancel;
        }
    });
}, O = function(t) {
    var s = this;
    0 == t && s.setData({
        comments: [],
        cPage: 1
    });
    var n = s.data.postsId, o = s.data.cPage;
    a.request(e.commentByPostsIdUrl, {
        posts_id: n,
        page: o
    }).then(function(t) {
        var e = t.data;
        e.data.length < 10 && s.setData({
            isCommentPage: !0
        }), e.data.length > 0 && s.setData({
            comments: s.data.comments.concat(e.data),
            cPage: e.current_page
        });
    });
}, M = function() {
    this.setData({
        cPage: this.data.cPage + 1,
        isCommentShow: !0,
        isCommentPage: !1
    }), this.loadRefreshComments(1);
}, V = function(t) {
    var e = t.currentTarget.dataset.src, a = t.currentTarget.dataset.list, s = [];
    for (var n in a) s.push(a[n].img_url);
    wx.previewImage({
        current: e,
        urls: s
    });
}, N = function(t) {
    this.setData({
        postsIndex: t.currentTarget.dataset.index,
        showDialog: !this.data.showDialog,
        postsId: t.currentTarget.dataset.id,
        isMyPosts: t.currentTarget.dataset.ismyposts,
        isCollect: t.currentTarget.dataset.iscollect
    });
}, H = function(t) {
    this.setData({
        postsIndex: t.currentTarget.dataset.index,
        showShare: !this.data.showShare,
        postsId: t.currentTarget.dataset.id
    });
}, G = function(t) {
    var e = parseFloat(t.currentTarget.dataset.lng), a = parseFloat(t.currentTarget.dataset.lat), s = t.currentTarget.dataset.name;
    wx.openLocation({
        latitude: a,
        longitude: e,
        scale: 8,
        name: s
    });
}, B = function(t) {
    var e = t.currentTarget.dataset.id, a = this.data.posts;
    for (var s in a) if (a[s].id == e) {
        a[s].is_content_beyond = !1;
        break;
    }
    this.setData({
        posts: a
    });
}, j = function(t) {
    this.setData({
        indexvideo: t.currentTarget.dataset.index,
        video: t.currentTarget.dataset.video,
        popupshow: !0
    });
}, E = function() {
    this.setData({
        video: "",
        popupshow: !1
    });
}, Q = function(t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/pages/circle/list?id=" + e
    });
}, W = function(t) {
    var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name;
    wx.navigateTo({
        url: "/pages/tags/tags?id=" + e + "&name=" + a
    });
}, J = function() {
    this.setData({
        showDialog: !this.data.showDialog
    });
}, K = function() {
    this.setData({
        showShare: !this.data.showShare
    });
}, X = function() {
    this.setData({
        showDialog: !this.data.showDialog,
        bounced: !this.data.bounced
    });
}, Y = function() {
    this.setData({
        bounced: !this.data.bounced
    });
}, Z = function(t) {
    var s = this, n = t.currentTarget.dataset.id, o = t.currentTarget.dataset.comment_count;
    s.setData({
        showComments: !s.data.showComments,
        commentCount: o,
        postsId: n,
        commentIsNull: !1
    }), a.request(e.commentByPostsIdUrl, {
        posts_id: n,
        page: 1
    }).then(function(t) {
        s.setData({
            commentIsNull: !0,
            comments: t.data.data,
            cPage: t.data.current_page
        });
    });
}, $ = function() {
    this.setData({
        showComments: !this.data.showComments
    });
}, tt = function(t) {
    var e = t.currentTarget.dataset.postsid, a = t.currentTarget.dataset.id, s = t.currentTarget.dataset.userid, n = t.currentTarget.dataset.reply;
    void 0 !== n && "undefined" != a && "undefined" != s ? n = "回复 " + n + "：" : (n = "说点什么", 
    a = "", s = ""), void 0 !== e && this.setData({
        postsId: e
    }), this.setData({
        showTextarea: !this.data.showTextarea,
        focus: !0,
        commentId: a,
        replyUserId: s,
        replyName: n
    });
}, et = function() {
    this.setData({
        showTextarea: !this.data.showTextarea,
        focus: !1,
        commentId: "",
        replyUserId: "",
        replyName: "说点什么"
    });
}, at = function(t) {
    wx.showLoading({
        title: " "
    });
    var s = this, n = t.detail.value, o = s.data.imageValue, i = s.data.postsId, r = s.data.commentId, d = s.data.replyUserId;
    a.request(e.commentAddUrl, {
        posts_id: i,
        comment_content: n,
        comment_img_url: o,
        comment_id: r,
        reply_user_id: d
    }, "POST").then(function(t) {
        t.status ? (wx.hideLoading(), s.setData({
            showTextarea: !s.data.showTextarea,
            focus: !1
        }), wx.showToast({
            title: "评论成功！审核中...",
            icon: "none",
            duration: 1500
        }), s.loadRefreshComments(0)) : (wx.showToast({
            title: "评论失败了！",
            icon: "none",
            duration: 1500
        }), wx.hideLoading());
    });
}, st = function(t) {
    this.uploadPictures(1, t.currentTarget.dataset.name), this.setData({
        showTextarea: !this.data.showTextarea,
        focus: !1
    });
}, nt = function() {
    this.setData({
        imageValue: ""
    });
}, ot = function() {
    var t = this;
    a.request(e.postsMakeShowQcodeUrl, {
        posts_id: t.data.postsId
    }).then(function(e) {
        if (e.status) {
            var a = {};
            a = "" != e.data.img && null != e.data.img ? {
                width: 750,
                height: 1334,
                backgroundColor: "#f5f5f5",
                debug: !1,
                pixelRatio: 1,
                blocks: [ {
                    width: 690,
                    height: 1084,
                    x: 30,
                    y: 150,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 30
                } ],
                texts: [ {
                    x: 370,
                    y: 94,
                    baseLine: "middle",
                    textAlign: "center",
                    text: "轻航，专属互联网人的内容兴趣社区",
                    fontSize: 32,
                    color: "#000"
                }, {
                    x: 70,
                    y: 800,
                    fontSize: 28,
                    lineHeight: 40,
                    baseLine: "middle",
                    text: e.data.content,
                    width: 600,
                    lineNum: 3,
                    color: "#333333",
                    zIndex: 200
                }, {
                    x: 370,
                    y: 1190,
                    baseLine: "middle",
                    textAlign: "center",
                    text: "微信扫一扫或长按识别小程序查看详情",
                    fontSize: 24,
                    color: "#949494",
                    zIndex: 200
                }, {
                    x: 124,
                    y: 726,
                    baseLine: "middle",
                    text: e.data.user.user_name,
                    fontSize: 32,
                    color: "#000",
                    zIndex: 200
                } ],
                images: [ {
                    width: 690,
                    height: 520,
                    x: 30,
                    y: 150,
                    url: e.data.img,
                    zIndex: 100,
                    borderRadius: 30
                }, {
                    width: 200,
                    height: 200,
                    x: 275,
                    y: 950,
                    url: e.data.qrcode
                }, {
                    width: 50,
                    height: 50,
                    x: 60,
                    y: 700,
                    borderRadius: 50,
                    url: e.data.user.user_avatar
                } ]
            } : {
                width: 750,
                height: 1334,
                backgroundColor: "#f5f5f5",
                debug: !1,
                pixelRatio: 1,
                blocks: [ {
                    width: 690,
                    height: 1084,
                    x: 30,
                    y: 150,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 30
                } ],
                texts: [ {
                    x: 370,
                    y: 94,
                    baseLine: "middle",
                    textAlign: "center",
                    text: "轻航，专属互联网人的内容兴趣社区",
                    fontSize: 32,
                    color: "#000"
                }, {
                    x: 70,
                    y: 350,
                    fontSize: 28,
                    lineHeight: 40,
                    baseLine: "middle",
                    text: e.data.content,
                    width: 600,
                    lineNum: 5,
                    color: "#333333",
                    zIndex: 200
                }, {
                    x: 370,
                    y: 1070,
                    baseLine: "middle",
                    textAlign: "center",
                    text: "微信扫一扫或长按识别小程序查看详情",
                    fontSize: 24,
                    color: "#949494",
                    zIndex: 200
                }, {
                    x: 124,
                    y: 276,
                    baseLine: "middle",
                    text: e.data.user.user_name,
                    fontSize: 32,
                    color: "#000",
                    zIndex: 200
                } ],
                images: [ {
                    width: 300,
                    height: 300,
                    x: 225,
                    y: 700,
                    url: e.data.qrcode,
                    zIndex: 100
                }, {
                    width: 50,
                    height: 50,
                    x: 60,
                    y: 250,
                    borderRadius: 50,
                    url: e.data.user.user_avatar
                } ]
            }, t.setData({
                posterConfig: a
            }, function() {
                s.create(!0);
            });
        } else wx.showToast({
            title: "生成海报失败了，请联系轻航官方客服反馈！",
            icon: "none",
            duration: 1500
        });
    });
}, it = function(t) {
    this.needRefresh = !1;
    var e = t.detail;
    wx.previewImage({
        current: e,
        urls: [ e ]
    });
}, rt = function(t) {
    console.error(t);
}, dt = function(t) {
    var s = this, n = t.currentTarget.dataset.id, o = t.currentTarget.dataset.ecount;
    void 0 !== n && "undefined" != o && a.request(e.getExceptionalListUrl, {
        posts_id: n
    }).then(function(t) {
        var e = {};
        e.exceptionalList = t.data, e.exceptionalCount = o, s.setData(e);
    }), s.setData({
        rewardDialog: !s.data.rewardDialog
    });
}, ct = function(t) {
    this.setData({
        rewardPopup: !this.data.rewardPopup,
        postsId: t.currentTarget.dataset.id,
        postsUserId: t.currentTarget.dataset.userid,
        postsIndex: t.currentTarget.dataset.index,
        rewardPrice: ""
    });
}, ut = function() {
    this.setData({
        rewardPopup: !this.data.rewardPopup
    });
}, lt = function(t) {
    this.setData({
        rewardPrice: t.currentTarget.dataset.price
    });
}, ht = function(t) {
    this.setData({
        rewardPrice: t.detail.value
    });
}, gt = function() {
    var t = this;
    a.request(e.mySearchListUrl).then(function(e) {
        if (e.status) {
            var a = {};
            e.data.length <= 0 && (a.myhotsSat = !1), a.myhots = e.data, t.setData(a);
        }
    });
}, pt = function(t) {
    var s = this, n = t.currentTarget.dataset.index;
    a.request(e.myDelSearchUrl, {
        id: t.currentTarget.dataset.id
    }).then(function(t) {
        if (t.status) {
            var e = s.data.myhots, a = {};
            e.splice([ n ], 1), a.myhots = e, s.setData(a);
        }
    });
}, mt = function() {
    var t = this;
    a.request(e.myDelAllSearchUrl).then(function(e) {
        e.status && (wx.showToast({
            title: "操作成功",
            icon: "none",
            duration: 1500
        }), t.mySearchList());
    });
}, ft = function(t) {
    var e = t.currentTarget.dataset.src, a = t.currentTarget.dataset.pic, s = [];
    for (var n in a) s.push(a[n].url);
    wx.previewImage({
        current: e,
        urls: s
    });
}, wt = function(t) {
    var e = t.currentTarget.dataset.src, a = [];
    a.push(e), wx.previewImage({
        current: e,
        urls: a
    });
}, xt = function(t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/pages/shop/goods-details/goods-details?id=" + e
    });
}, vt = function() {
    var t = this;
    a.request(e.freeGetVipUrl).then(function(s) {
        s.status && a.request(e.userInfoUrl).then(function(e) {
            wx.setStorageSync("userInfo", e.data), t.setData({
                vipPopup: !1
            }), wx.showToast({
                title: "领取成功，已为您开通轻航大会员！",
                icon: "none"
            });
        });
    });
};

module.exports = function(t) {
    t.freeGetVip = vt, t.getShopGoodsPostsList = b, t.toGoodsDetails = xt, t.onPreviewImage = wt, 
    t.onPreviewPicture = ft, t.myDelAllSearch = mt, t.myDelSearch = pt, t.mySearchList = gt, 
    t.imageClipper = o, t.uploadPicturesPic = i, t.shutReward = ut, t.rewardPriceChange = ht, 
    t.addRewardPrice = lt, t.onClickReward = dt, t.rewardTap = ct, t.searchCarouselList = D, 
    t.getSysMessageCount = n, t.userTap = S, t.userInfoActionFollow = f, t.toPostsDetail = g, 
    t.userPlateDelete = I, t.userPlateAdd = y, t.userPlate = P, t.postsTage = _, t.tagePostsList = C, 
    t.commentTolower = M, t.tapDeleteComments = R, t.tapCommentslike = z, t.uploadPictures = r, 
    t.checkPermission = d, t.getindexBannerList = c, t.indexPosts = u, t.indexChoiceness = l, 
    t.taplikes = U, t.editOrCollectTap = k, t.bouncedDeleteTap = q, t.actionFollow = m, 
    t.postsActionFollow = L, t.userActionFollow = w, t.postsDetail = p, t.indexSearch = x, 
    t.searchCount = v, t.searchHotList = T, t.tapCommentlike = F, t.tagsHot = h, t.tapDeleteComment = A, 
    t.loadRefreshComments = O, t.shareTap = H, t.editTap = N, t.previewImgFunc = V, 
    t.getVideoUrl = j, t.gotoComments = Z, t.toShutComments = $, t.openmap = G, t.unfoldTap = B, 
    t.popuphidden = E, t.onClickCancle = J, t.onClickShare = K, t.toTagesInfo = W, t.editOrDeleteTap = X, 
    t.bouncedTap = Y, t.tapComment = tt, t.shutCommentShow = et, t.onInputComment = at, 
    t.addCommentPic = st, t.delCommentPic = nt, t.sharePosterClick = ot, t.onPosterSuccess = it, 
    t.onPosterFail = rt, t.routeClubDetail = Q;
};