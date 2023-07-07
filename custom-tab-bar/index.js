getApp();

Component({
    data: {
        selected: 0,
        sysMessageCount: 0,
        color: "#949494",
        selectedColor: "#333333",
        fontWeight: "bold",
        list: [ {
            pagePath: "/pages/Tabbar/index/index",
            iconPath: "/image/Tabbar/tab_index_normal.png",
            selectedIconPath: "/image/Tabbar/tab_index_active.png",
            text: "首页"
        }, {
            pagePath: "/pages/Tabbar/consignment/consignment",
            iconPath: "/image/Tabbar/tab_nearby_normal.png",
            selectedIconPath: "/image/Tabbar/tab_nearby_active.png",
            text: "寄卖"
        }, {
            pagePath: "/pages/Tabbar/create/create",
            iconPath: "/image/Tabbar/icon_add.png",
            selectedIconPath: "/image/Tabbar/icon_add.png",
            text: "",
            isSpecial: !0
        }, {
            pagePath: "/pages/Tabbar/shop/shop",
            iconPath: "/image/Tabbar/tab_shop_normal.png",
            selectedIconPath: "/image/Tabbar/tab_shop_active.png",
            text: "SHOP"
        }, {
            pagePath: "/pages/Tabbar/mine/mine",
            iconPath: "/image/Tabbar/tab_user_normal.png",
            selectedIconPath: "/image/Tabbar/tab_user_active.png",
            text: "我家"
        } ]
    },
    attached: function() {},
    methods: {
        switchTab: function(a) {
            var i = a.currentTarget.dataset.index, e = a.currentTarget.dataset.url;
            this.data.list[i].isSpecial ? wx.navigateTo({
                url: e
            }) : wx.switchTab({
                url: e
            });
        }
    }
});