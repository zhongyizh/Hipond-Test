var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/objectSpread2"), i = e(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-class" ],
    behaviors: [ i.default ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../step/index": {
            type: "child",
            linked: function() {
                this._initSteps();
            },
            unlinked: function() {
                this._initSteps();
            }
        }
    },
    properties: {
        direction: {
            type: String,
            value: "row",
            options: [ "row", "column" ]
        },
        activeIndex: {
            type: Number,
            value: 0
        },
        color: String,
        stepMinHeight: {
            type: String,
            value: "120"
        },
        status: {
            type: String,
            value: "process",
            options: [ "process", "error" ]
        },
        dot: Boolean
    },
    observers: {
        activeIndex: function() {
            this._initSteps();
        }
    },
    data: {},
    methods: {
        _initSteps: function() {
            var e = this;
            wx.createSelectorQuery().in(this).select(".steps-container").boundingClientRect().exec(function(i) {
                var n = e.getRelationNodes("../step/index");
                e.data.length = n.length, e.data.length > 0 && n.forEach(function(n, r) {
                    n.updateDataChange(t(t({
                        index: r
                    }, e.data), {}, {
                        stepsWidth: i[0].width
                    }));
                });
            });
        }
    }
});