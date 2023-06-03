var e = require("../../@babel/runtime/helpers/objectSpread2");

Component({
    relations: {
        "../grid/index": {
            type: "parent"
        }
    },
    externalClasses: [ "l-grid-item", "l-grid-item-class" ],
    properties: {
        key: String,
        cell: {
            type: Object,
            value: {}
        }
    },
    data: {
        index: 0
    },
    attached: function() {},
    observers: {
        key: function() {
            var e = this.getRelationNodes("../grid/index")[0];
            e && (e.setData({
                gridItems: [],
                childNum: 0
            }), e.initGrids());
        }
    },
    lifetimes: {
        show: function() {}
    },
    methods: {
        tapGridItem: function() {
            this.triggerEvent("linitemtap", e({}, this.data), {
                bubbles: !0,
                composed: !0
            });
        }
    }
});