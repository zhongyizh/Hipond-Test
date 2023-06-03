var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/defineProperty"), n = e(require("../core/utils/event-bus")), r = e(require("../behaviors/rules"));

Component({
    externalClasses: [ "l-class", "l-error-text", "l-error-text-class" ],
    behaviors: [ "wx://form-field", r.default ],
    relations: {
        "../radio/index": {
            type: "child",
            linked: function() {
                this.init();
            },
            linkChanged: function() {},
            unlinked: function() {
                this.init();
            }
        }
    },
    properties: {
        current: {
            type: String
        },
        noneChecked: {
            type: Boolean,
            value: !0
        },
        placement: {
            type: String,
            value: "column"
        }
    },
    data: {
        currentLength: 0
    },
    methods: {
        checkedKeyRepeat: function(e) {
            var t = e.map(function(e) {
                return e.data.key;
            }), n = this.isRepeat(t);
            if (!1 !== n) throw new Error("keys有重复元素, radio的key属性不能重复：" + n);
        },
        isRepeat: function(e) {
            var t = {};
            for (var n in e) {
                if (t[e[n]]) return e[n];
                t[e[n]] = !0;
            }
            return !1;
        },
        init: function() {
            var e = this.getRelationNodes("../radio/index");
            this.checkedKeyRepeat(e), this.onChangeHandle(e);
        },
        onChangeHandle: function(e) {
            var t = this;
            e.forEach(function(e) {
                var n = t.properties.current === e.data.key;
                e.setChecked(n, e.data.key);
            });
        },
        onEmitEventHandle: function(e, r) {
            this.properties.current = r ? e.key : null;
            var i = this.getRelationNodes("../radio/index");
            this.onChangeHandle(i), Object.assign(e, {
                currentKey: this.properties.current
            }), this.validatorData(t({}, this.data.name, this.data.current)), this.triggerEvent("linchange", e, {
                bubbles: !0,
                composed: !0
            }), n.default.emit("lin-form-change-" + this.id, this.id);
        },
        getValues: function() {
            return this.data.current;
        },
        reset: function() {
            this.data.current = "";
        }
    },
    observers: {
        current: function() {
            this.init();
        }
    }
});