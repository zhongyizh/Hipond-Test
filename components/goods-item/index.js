Component({
    properties: {
        data: Object
    },
    data: {},
    methods: {
        toGoodsDetail: function(t) {
            wx.navigateTo({
                url: "/pages/shop/goods-details/goods-details?id=" + t.currentTarget.dataset.id
            });
        }
    }
});