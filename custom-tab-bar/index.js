getApp();

Component({
    data: {
        selected: 0,
        sysMessageCount: 0,
        color: "#A4C5C2",
        selectedColor: "#A4C5C2",
        fontWeight: "normal",
        list: [ {
            pagePath: "/pages/tab-bar/index/index",
            iconPath: "/image/tab-bar/tab_index_normal.png",
            selectedIconPath: "/image/tab-bar/tab_index_active.png",
            text: "首页"
        }, {
            pagePath: "/pages/tab-bar/consignment/consignment",
            iconPath: "/image/tab-bar/tab_shop_normal.png",
            selectedIconPath: "/image/tab-bar/tab_shop_active.png",
            text: "市场"
        }, {
            pagePath: "/pages/post/new-post-select/new-post-select",
            iconPath: "/image/tab-bar/icon_add.png",
            selectedIconPath: "/image/tab-bar/icon_add.png",
            text: "",
            isSpecial: !0
        }, {
						pagePath: "/pages/tab-bar/shop/shop",
            iconPath: "/image/tab-bar/tab_notification_normal.png",
            selectedIconPath: "/image/tab-bar/tab_notification_active.png",
            text: "消息"
        }, {
            pagePath: "/pages/tab-bar/mine/mine",
            iconPath: "/image/tab-bar/tab_user_normal.png",
            selectedIconPath: "/image/tab-bar/tab_user_active.png",
            text: "我的"
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