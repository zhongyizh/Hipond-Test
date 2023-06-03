var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../core/utils/event-bus.js"));

Component({
    externalClasses: [ "l-form-container-class", "l-form-submit-class", "l-form-reset-class", "l-form-btn-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../form-item/index": {
            type: "child",
            linked: function(t) {
                this._initItem(t);
            },
            linkChanged: function() {},
            unlinked: function() {}
        }
    },
    properties: {
        name: {
            type: String,
            value: ""
        },
        isSubmitValidate: {
            type: Boolean,
            value: !0
        }
    },
    attached: function() {
        this._init();
    },
    data: {
        _this: null
    },
    methods: {
        _init: function() {
            wx.lin = wx.lin || {}, wx.lin.forms = wx.lin.forms || {}, wx.lin.forms[this.properties.name] = this, 
            wx.lin.initValidateForm = function(t) {
                wx.lin._instantiation = t;
            }, wx.lin.submitForm = function(t) {
                wx.lin.forms[t].submit();
            }, wx.lin.resetForm = function(t) {
                wx.lin.forms[t].reset();
            };
        },
        _initItem: function(e) {
            var i = this;
            this._keys = this._keys || {}, this._errors = this._errors || {};
            var n = e.properties.name;
            if (t.default.on("lin-form-blur-" + n, function(t) {
                i._validateItem(t, "blur");
            }), t.default.on("lin-form-change-" + n, function(t) {
                clearTimeout(i.change_time), i.change_time = setTimeout(function() {
                    i._validateItem(t, "change");
                }, 200);
            }), this._keys[n]) throw new Error("表单项存在重复的name：" + n);
            this._keys[n] = "", this._errors[n] = [];
        },
        _validateItem: function(t, e) {
            var i = wx.lin._instantiation, n = this._getValues(), r = this.getRelationNodes("../form-item/index").find(function(e) {
                return e.properties.name === t;
            });
            if (!i.selectComponent("#" + t)) throw new Error("表单项不存在name：" + t);
            return r.validatorData(n, e), this._errors[t] = r.data.errors, r.data.errors;
        },
        _forEachNodes: function(t, e) {
            var i = this.getRelationNodes("../form-item/index");
            e && i.reverse(), i.forEach(function(e, i) {
                t(e, i);
            });
        },
        _validateForm: function() {
            var t = this, e = wx.lin._instantiation, i = [], n = this._getValues();
            return this._forEachNodes(function(r) {
                var s = r.properties.name;
                if (!e.selectComponent("#" + s)) throw new Error("表单项不存在name：" + s);
                r.validatorData(n), t._errors[s] = r.data.errors, i = i.concat(r.data.errors);
            }, !0), i;
        },
        _getValues: function() {
            var t = {}, e = wx.lin._instantiation;
            return this._forEachNodes(function(i) {
                var n = i.properties.name, r = e.selectComponent("#" + n);
                r && (t[n] = r.getValues());
            }), t;
        },
        submit: function() {
            var t = this.data.isSubmitValidate ? this._validateForm() : [];
            this.triggerEvent("linsubmit", {
                values: this._getValues(),
                errors: this.data.isSubmitValidate ? this._errors : {},
                isValidate: 0 === t.length
            });
        },
        reset: function() {
            var t = wx.lin._instantiation;
            this._forEachNodes(function(e) {
                e.setData({
                    errorText: ""
                });
                var i = e.properties.name, n = t.selectComponent("#" + i);
                n && n.reset();
            });
        }
    }
});