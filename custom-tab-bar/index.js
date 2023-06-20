getApp();

Component({
    data: {
        selected: 0,
        sysMessageCount: 0,
        color: "#949494",
        selectedColor: "#333333",
        fontWeight: "bold",
        list: [ {
            pagePath: "/pages/tabbar/index/index",
            iconPath: "/image/tabbar/tab_index_normal.png",
            selectedIconPath: "/image/tabbar/tab_index_active.png",
            text: "首页"
        }, {
            pagePath: "pages/Tabbar/consignment/consignment",
            iconPath: "/image/tabbar/tab_nearby_normal.png",
            selectedIconPath: "/image/tabbar/tab_nearby_active.png",
            text: "寄卖"
        }, {
            pagePath: "pages/Tabbar/creat/creat",
            iconPath: "/image/tabbar/icon_add.png",
            selectedIconPath: "/image/tabbar/icon_add.png",
            text: "",
            isSpecial: !0
        }, {
            pagePath: "/pages/tabbar/shop/shop",
            iconPath: "/image/tabbar/tab_shop_normal.png",
            selectedIconPath: "/image/tabbar/tab_shop_active.png",
            text: "SHOP"
        }, {
            pagePath: "/pages/tabbar/mine/mine",
            iconPath: "/image/tabbar/tab_user_normal.png",
            selectedIconPath: "/image/tabbar/tab_user_active.png",
            text: "我家"
        } ]
    },
    attached: function() {},
    methods: {
        switchTab: function(a) {
            var t = a.currentTarget.dataset.index, e = a.currentTarget.dataset.url;
            this.data.list[t].isSpecial ? wx.navigateTo({
                url: e
            }) : wx.switchTab({
                url: e
            });
        }
    }
});