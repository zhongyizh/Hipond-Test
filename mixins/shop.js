var t = require("../@babel/runtime/helpers/createForOfIteratorHelper"), a = (getApp(), 
require("../utils/api")), e = require("../utils/util"), o = function(t) {
    var a = t.currentTarget.dataset.src, e = t.currentTarget.dataset.list;
    wx.previewImage({
        current: a,
        urls: e
    });
}, n = function() {
    var t = this;
    e.request(a.getShopBannerUrl).then(function(a) {
        var e = {};
        e.banner = a.data, t.setData(e);
    });
}, i = function() {
    var t = this;
    e.request(a.getShopNoticeUrl).then(function(a) {
        var e = {};
        e.notice = a.data, t.setData(e);
    });
}, r = function() {
    var t = this;
    e.request(a.getShopClassifyUrl).then(function(a) {
        var e = {};
        e.cats = t.data.cats.concat(a.data), t.setData(e);
    });
}, s = function() {
    var t = this;
    e.request(a.getShopIndexRecommendUrl, {
        page: t.data.page
    }).then(function(a) {
        var e = a.data, o = {};
        e.data.length > 0 ? o.recommendList = e.data : "" == e.data && (o.isLastPage = !0), 
        o.page = e.current_page, t.setData(o), e.data.length > 0 && (1 == t.data.page ? wx.lin.renderWaterFlow(t.data.recommendList, !0) : wx.lin.renderWaterFlow(t.data.recommendList, !1));
    });
}, d = function() {
    var o = this;
    e.request(a.getShopGoodsDetailsUrl, {
        id: o.data.id
    }).then(function(a) {
        var e, n = "", i = t(a.data.service);
        try {
            for (i.s(); !(e = i.n()).done; ) {
                n += e.value.name + "、";
            }
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            i.e(t);
        } finally {
            i.f();
        }
        n = n.slice(0, n.length - 1);
        var r = {};
        r.serviceTxt = n, r.goodsinfo = a.data, r.param = a.data.param_data, o.setData(r);
    });
}, c = function() {
    var t = this;
    e.request(a.getShopInspirationUrl).then(function(a) {
        var e = {};
        e.swiperList = a.data, t.setData(e), t.towerSwiper("swiperList");
    });
}, u = function() {
    var t = this;
    e.request(a.getShopHotListUrl).then(function(a) {
        var e = {};
        e.hotList = a.data, t.setData(e);
    });
}, h = function() {
    var t = this;
    e.request(a.getShopPlateUrl).then(function(a) {
        var e = {};
        e.plateList = a.data, e.topload = !1, t.setData(e);
    });
}, p = function() {
    var t = this;
    e.request(a.getShopClassifyGoodsListUrl, {
        cid: t.data.curIdx,
        page: t.data.page
    }).then(function(a) {
        var e = a.data, o = {
            loading: !1
        };
        e.data.length > 0 ? o.goodsList = t.data.goodsList.concat(e.data) : "" == e.data && (o.isLastPage = !0, 
        1 == e.current_page && (o.isEmpty = !0)), o.page = e.current_page, t.setData(o);
    });
}, g = function() {
    var t = this;
    e.request(a.getShopGoodsSearchUrl, {
        keyword: t.data.keyword,
        page: t.data.page
    }).then(function(a) {
        var e = a.data, o = {
            loading: !1
        };
        e.data.length > 0 ? o.goodsList = t.data.goodsList.concat(e.data) : "" == e.data && (o.isLastPage = !0, 
        1 == e.current_page && (o.isEmpty = !0)), o.page = e.current_page, t.setData(o);
    });
}, l = function() {
    var t = this;
    e.request(a.getShopGoodsPostsUrl, {
        gid: t.data.id
    }).then(function(a) {
        var e = {};
        e.goodsComment = a.data, t.setData(e);
    });
}, f = function() {
    var t = this, o = t.data.paraminfo;
    e.request(a.getShopAddCartUrl, {
        gid: t.data.id,
        pid: o.id,
        pname: t.data.goodsinfo.name,
        pvalue: o.value,
        pic: o.pic,
        price: o.price,
        vip_price: o.vip_price,
        stock: o.stock,
        num: t.data.num
    }, "POST").then(function(a) {
        200 == a.code ? (t.setData({
            detailsShow: !1
        }), wx.showToast({
            title: t.data.num + " 件商品已加入购物袋！",
            icon: "none",
            duration: 2e3
        }), t.userCartCount()) : wx.showToast({
            title: a.message,
            icon: "none",
            duration: 2e3
        });
    });
}, S = function() {
    var t = this;
    e.request(a.getShopUserCartListUrl).then(function(a) {
        var e = {};
        a.data.length > 0 ? e.cartGoods = a.data : e.isEmpty = !0, t.setData(e), t.calculateFun();
    });
}, v = function(t, o, n, i) {
    var r = this;
    e.request(a.getShopSaveCartNumUrl, {
        pid: t,
        num: o
    }).then(function(t) {
        if (200 == t.code) {
            var a = r.data.cartGoods;
            a[n].num = o;
            var e = {};
            e.cartGoods = a, e.numindx = i, r.setData(e), r.calculateFun();
        } else wx.showToast({
            title: "库存不够啦，该商品最多可追加" + t.data + "件",
            icon: "none",
            duration: 2e3
        });
    });
}, m = function(t, o) {
    var n = this;
    e.request(a.getShopCheckCartGoodsUrl, {
        pid: t,
        check: o
    }).then(function(t) {
        n.calculateFun();
    });
}, w = function(t) {
    var o = this;
    e.request(a.getShopAllCheckCartGoodsUrl, {
        is_check: t
    }).then(function(t) {
        o.getShopUserCartList();
    });
}, C = function() {
    var t = this;
    e.request(a.getShopDelCartGoodsUrl, {
        cid: t.data.cid
    }).then(function(a) {
        t.data.cartGoods.length > 0 ? t.calculateFun() : t.setData({
            isEmpty: !0
        });
    });
}, q = function() {
    var t = this;
    e.request(a.getShopGetAddsListUrl).then(function(a) {
        var e = {};
        e.list = a.data, t.setData(e);
    });
}, y = function() {
    var t = this, o = 0;
    t.data.is_check && (o = 1), e.request(a.getShopSaveAddsUrl, {
        aid: t.data.aid,
        name: t.data.name,
        mobile: t.data.mobile,
        province: t.data.address[0],
        city: t.data.address[1],
        county: t.data.address[2],
        adds: t.data.adds,
        is_check: o
    }, "POST").then(function(a) {
        wx.showToast({
            title: "保存成功",
            icon: "none"
        }), t.setData({
            addsPopup: !1
        }), t.getShopGetAddsList();
    });
}, D = function() {
    e.request(a.getShopDelAddsUrl, {
        aid: this.data.aid
    }).then(function(t) {});
}, U = function() {
    var t = this;
    e.request(a.getShopGetCheckAddsUrl, {
        aid: t.data.aid
    }).then(function(a) {
        var e = {};
        e.aid = a.data.id, e.addsinfo = a.data, t.setData(e);
    });
}, L = function() {
    var t = this;
    e.request(a.getShopPliceOrderGoodsUrl).then(function(a) {
        var e = {};
        e.goodslist = a.data, t.setData(e), t.calculateFun();
    });
}, P = function() {
    var t = this;
    e.request(a.shopPliceOrderUrl, {
        aid: t.data.aid,
        user_remark: t.data.user_remark,
        goods_amount: t.data.amount,
        discounts_amount: t.data.discountsAmount,
        order_amount: t.data.vipAmount,
        order_goods: t.data.goodslist
    }, "POST").then(function(a) {
        if (wx.hideLoading(), 200 == a.code) {
            var e = a.data;
            wx.requestPayment({
                timeStamp: e.timeStamp,
                nonceStr: e.nonceStr,
                package: e.package,
                signType: e.signType,
                paySign: e.paySign,
                success: function(a) {
                    t.setData({
                        payPopup: !0,
                        payTitle: "支付成功"
                    });
                },
                fail: function(a) {
                    t.setData({
                        payPopup: !0,
                        payTitle: "支付失败"
                    });
                }
            });
        }
    });
}, G = function() {
    var t = this;
    e.request(a.getShopOrderListUrl, {
        page: t.data.page,
        type: t.data.baridx
    }).then(function(a) {
        var e = a.data, o = {
            loading: !1
        };
        e.data.length > 0 ? o.list = t.data.list.concat(e.data) : "" == e.data && (o.isLastPage = !0, 
        1 == e.current_page && (o.isEmpty = !0)), o.page = e.current_page, t.setData(o);
    });
}, x = function() {
    e.request(a.getShopDelOrderUrl, {
        oid: this.data.oid
    }).then(function(t) {});
}, T = function() {
    e.request(a.getShopCancelOrderUrl, {
        oid: this.data.oid
    }).then(function(t) {});
}, _ = function(t) {
    var o = this;
    wx.showLoading({
        title: "正在唤起支付"
    });
    var n = t.currentTarget.dataset.on, i = t.currentTarget.dataset.amount;
    e.request(a.shopPaymentUrl, {
        orderSn: n,
        order_amount: i
    }, "POST").then(function(t) {
        if (wx.hideLoading(), 200 == t.code) {
            var a = t.data;
            wx.requestPayment({
                timeStamp: a.timeStamp,
                nonceStr: a.nonceStr,
                package: a.package,
                signType: a.signType,
                paySign: a.paySign,
                success: function(t) {
                    wx.showToast({
                        title: "支付成功",
                        icon: "success",
                        success: function(t) {
                            o.setData({
                                baridx: 2,
                                list: [],
                                page: 1,
                                loading: !1,
                                loadmoreShow: !1,
                                isLastPage: !1,
                                isEmpty: !1,
                                particulars: !1
                            }), o.getShopOrderList();
                        }
                    });
                },
                fail: function(t) {
                    wx.showToast({
                        title: "取消支付",
                        icon: "error"
                    });
                }
            });
        } else wx.showToast({
            title: "唤起支付失败",
            icon: "error"
        });
    });
}, O = function() {
    e.request(a.getShopPushDeliveryUrl, {
        on: this.data.on,
        title: "催发货",
        message: "订单：" + this.data.on + "用户在催发货了。"
    }, "POST").then(function(t) {
        200 == t.code ? wx.showToast({
            title: "订单催发货通知成功，我们会尽快为您处理。",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: t.message,
            icon: "none",
            duration: 2e3
        });
    });
}, k = function() {
    var t = this.data.refundGoods, o = "订单：" + this.data.on + "；" + t.quantity + "件 " + t.name + "【" + t.product + "】会员价为：【" + t.vip_price + "】普通价为：" + t.price + " 申请退款。";
    e.request(a.getShopOrderRefundUrl, {
        opid: t.product_id,
        oid: t.order_id,
        on: this.data.on,
        title: "退款申请",
        message: o
    }, "POST").then(function(t) {
        wx.showToast({
            title: "退款申请提交成功，我们会尽快为您处理。",
            icon: "none",
            duration: 2e3
        });
    });
}, A = function() {
    var t = this;
    e.request(a.getShopConfirmReceiptUrl, {
        oid: t.data.oid
    }).then(function(a) {
        t.setData({
            baridx: 4,
            list: [],
            page: 1,
            loading: !1,
            loadmoreShow: !1,
            isLastPage: !1,
            isEmpty: !1,
            particulars: !1
        }), t.getShopOrderList();
    });
}, b = function() {
    var t = this;
    e.request(a.getShopOrderCountUrl).then(function(a) {
        var e = t.data.tapbar;
        e[1].count = a.data.payCount, e[2].count = a.data.deliverCount, e[3].count = a.data.closedCount, 
        t.setData({
            tapbar: e
        });
    });
}, F = function() {
    var t = this, o = t.data.refundGoods, n = "订单：" + t.data.on + "；" + o.quantity + "件 " + o.name + "【" + o.product + "】会员价为：【" + o.vip_price + "】普通价为：" + o.price + " 申请退货退款。";
    e.request(a.getShopRefundGoodsUrl, {
        opid: o.product_id,
        oid: o.order_id,
        on: t.data.on,
        title: "退货退款申请",
        message: n
    }, "POST").then(function(a) {
        wx.setClipboardData({
            data: t.data.on
        }), t.setData({
            serviceShow: !0
        });
    });
}, R = function() {
    var t = this;
    e.request(a.userCartCountUrl).then(function(a) {
        t.setData({
            cartCount: a.data
        });
    });
};

module.exports = function(t) {
    t.userCartCount = R, t.getShopRefundGoods = F, t.getShopOrderCount = b, t.getShopConfirmReceipt = A, 
    t.getShopOrderRefund = k, t.getShopPushDelivery = O, t.shopPayment = _, t.getShopCancelOrder = T, 
    t.getShopDelOrder = x, t.getShopOrderList = G, t.shopPliceOrder = P, t.getShopPliceOrderGoods = L, 
    t.getShopDelAdds = D, t.getShopSaveAdds = y, t.getShopGetAddsList = q, t.getShopGetCheckAdds = U, 
    t.getShopDelCartGoods = C, t.getShopAllCheckCartGoods = w, t.getShopCheckCartGoods = m, 
    t.getShopSaveCartNum = v, t.getShopUserCartList = S, t.getShopAddCart = f, t.getShopGoodsPosts = l, 
    t.onPreviewPics = o, t.getShopBanner = n, t.getShopNotice = i, t.getShopClassify = r, 
    t.getShopIndexRecommend = s, t.getShopGoodsDetails = d, t.getShopInspiration = c, 
    t.getShopHotList = u, t.getShopPlate = h, t.getShopClassifyGoodsList = p, t.getShopGoodsSearch = g;
};