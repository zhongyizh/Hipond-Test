var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/objectSpread2"), a = e(require("../behaviors/scrollCenter"));

Component({
    behaviors: [ a.default ],
    externalClasses: [ "l-class", "l-header-class", "l-class-active", "l-active-class", "l-class-inactive", "l-inactive-class", "l-class-tabimage", "l-tab-image-class", "l-class-header-line", "l-header-line-class", "l-class-line", "l-line-class", "l-class-icon", "l-icon-class", "l-class-badge", "l-badge-class" ],
    options: {
        multipleSlots: !0,
        pureDataPattern: /^_/
    },
    relations: {
        "../segment-item/index": {
            type: "child",
            linked: function(e) {
                this.initTabs(e);
            }
        }
    },
    properties: {
        activeKey: {
            type: String,
            value: "",
            observer: "changeCurrent"
        },
        placement: {
            type: String,
            value: "top"
        },
        scrollable: Boolean,
        hasLine: {
            type: Boolean,
            value: !0
        },
        animatedForLine: Boolean,
        activeColor: {
            type: String
        },
        inactiveColor: {
            type: String
        },
        equalWidth: {
            type: Boolean,
            value: !0
        },
        even: {
            type: Boolean,
            value: !0
        },
        width: Number,
        height: Number,
        itemHeight: Number,
        itemWidth: Number
    },
    observers: {
        activeKey: function(e) {
            var t = this;
            if (e) {
                var a = this.data.tabList.findIndex(function(t) {
                    return t.key === e;
                });
                this.setData({
                    currentIndex: a
                }, function() {
                    t.data.scrollable && t.queryMultipleNodes();
                });
            }
        }
    },
    data: {
        tabList: [],
        currentIndex: 0,
        _segmentItemInstances: []
    },
    methods: {
        initTabs: function(e) {
            var a = this, n = this.data.activeKey, i = this.getRelationNodes("../segment-item/index");
            if (i.length > 0) {
                if (i.length === this.data.tabList.length && this.data._segmentItemInstances.indexOf(e) > 0) return;
                var s = n, l = this.data.currentIndex, r = i.map(function(e, a) {
                    return s = n || 0 !== a ? s : e.data.key, l = e.data.key === s ? a : l, t({}, e.data);
                });
                this.setData({
                    tabList: r,
                    activeKey: s,
                    currentIndex: l,
                    _segmentItemInstances: i
                }, function() {
                    a.data.scrollable && a.queryMultipleNodes();
                });
            }
        },
        handleChange: function(e) {
            var t = e.currentTarget.dataset.key, a = e.currentTarget.dataset.index;
            this._setChangeData({
                activeKey: t,
                currentIndex: a
            });
        },
        _setChangeData: function(e) {
            var t = this, a = e.activeKey, n = e.currentIndex;
            this.setData({
                activeKey: a,
                currentIndex: n
            }, function() {
                t.data.scrollable && t.queryMultipleNodes();
            }), this.triggerEvent("linchange", {
                activeKey: a,
                currentIndex: n
            });
        }
    }
});