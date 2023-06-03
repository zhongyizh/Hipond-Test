var e = require("../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = require("../../@babel/runtime/helpers/defineProperty"), r = e(require("../common/async-validator/index")), a = e(require("../behaviors/validator")), i = Behavior({
    behaviors: [ a.default ],
    properties: {
        rules: {
            type: [ Object, Array ],
            value: []
        },
        tipType: {
            type: String,
            value: "toast",
            options: [ "toast", "message", "text" ]
        }
    },
    data: {
        schema: "",
        tipFun: {
            message: "showMessage",
            toast: "showToast"
        },
        tipContent: {
            message: "content",
            toast: "title"
        },
        errorText: "",
        errors: []
    },
    methods: {
        initRules: function() {
            var e = this.data.rules;
            e && ("[object Object]" === Object.prototype.toString.call(e) && (this.data.rules = [ e ]), 
            this.data.rules.forEach(function(e) {
                e.trigger ? "string" != typeof e.trigger || (e.trigger = [ e.trigger ]) : e.trigger = [];
            }));
        },
        getNeedValidateRule: function(e) {
            var a = this.data.name, i = this.data.rules;
            if (i) {
                var s = e ? i.filter(function(t) {
                    return t.trigger.indexOf(e) > -1;
                }) : i, o = new r.default(t({}, a, s));
                return this.setData({
                    schema: o
                }), s;
            }
        },
        validatorData: function(e, r) {
            var a = this, i = this.data, s = i.tipType, o = i.tipFun, n = i.tipContent;
            this.getNeedValidateRule(r) && (Object.getOwnPropertyNames(e).forEach(function(t) {
                "" === e[t] && (e[t] = void 0);
            }), this.data.schema.validate(e, function(e) {
                if (a.setData({
                    errors: e || []
                }), a.triggerEvent("linvalidate", {
                    errors: e,
                    isError: !!e
                }), e && s) {
                    var r, i = o[s], l = n[s];
                    return "text" === s ? (a.setData({
                        errorText: e[0].message
                    }), e) : wx.lin && wx.lin[i] ? (wx.lin[i] && wx.lin[i]((t(r = {}, l, e[0].message), 
                    t(r, "duration", 1500), t(r, "mask", !1), r)), e) : (wx.showToast({
                        icon: "none",
                        title: "请在页面内引入".concat(s, "组件")
                    }), e);
                }
                !e && s && a.setData({
                    errorText: ""
                });
            }));
        }
    }
});

exports.default = i;