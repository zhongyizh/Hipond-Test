Component({
    options: {
        multipleSlots: !0
    },
    relations: {
        "../segment/index": {
            type: "parent",
            linked: function() {},
            unlinked: function() {}
        }
    },
    properties: {
        tab: String,
        key: String,
        icon: String,
        iconSize: {
            type: String,
            value: "20"
        },
        image: Object,
        picPlacement: {
            type: String,
            value: "top"
        },
        dotBadge: Boolean,
        badgeCount: {
            type: Number
        },
        badgeMaxCount: {
            type: Number,
            value: 99
        },
        badgeCountType: {
            type: String,
            value: "overflow"
        }
    },
    observers: {
        "**": function(t) {
            this.updateData(t);
        }
    },
    data: {},
    methods: {
        updateData: function(t) {
            var e = this, n = this.getRelationNodes("../segment/index")[0];
            if (n) {
                var a = n.data.tabList;
                if (a && a.length > 0) {
                    var i = a.findIndex(function(t) {
                        return t.key === e.data.key;
                    });
                    a[i] = t, n.setData({
                        tabList: a
                    }, function() {
                        n.data.scrollable && n.queryMultipleNodes();
                    });
                }
            }
        }
    }
});