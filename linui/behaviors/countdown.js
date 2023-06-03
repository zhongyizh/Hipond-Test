Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = Behavior({
    behaviors: [],
    properties: {
        time: {
            type: Date,
            value: new Date().getTime() + 864e5,
            observer: function(t, e) {
                t && !e && this.getLatestTime();
            }
        },
        status: {
            type: Boolean,
            value: !0,
            observer: function(t) {
                t ? this.init() : t || clearInterval(this.data.timer);
            }
        },
        timeType: {
            type: String,
            value: "datetime"
        },
        format: {
            type: String,
            value: "{%d}天{%h}时{%m}分{%s}秒"
        },
        isZeroPadd: {
            type: Boolean,
            value: !0
        },
        countdownType: {
            type: String,
            value: "normal"
        },
        isClearInterval: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        initAddTime: 0,
        timer: null,
        date: []
    },
    ready: function() {
        this.getLatestTime();
    },
    detached: function() {
        this.data.isClearInterval && clearInterval(this.data.timer);
    },
    pageLifetimes: {
        hide: function() {
            this.data.isClearInterval && clearInterval(this.data.timer);
        },
        show: function() {
            this.data.isClearInterval && this.getLatestTime();
        }
    },
    methods: {
        zeroPadding: function(t) {
            return (t = t.toString())[1] ? t : "0" + t;
        },
        init: function() {
            var t = this;
            clearInterval(this.data.timer);
            var e = setTimeout(function() {
                t.getLatestTime.call(t);
            }, 1e3);
            this.setData({
                timer: e
            });
        },
        getLatestTime: function() {
            var t = this.data, e = t.time, i = t.status, a = t.timeType, n = t.initAddTime, o = t.countdownType, s = e;
            if ("normal" === o) {
                if ("second" !== a && (s = "string" == typeof e ? s.replace(/-/g, "/") : s, s = Math.ceil((new Date(s).getTime() - new Date().getTime()) / 1e3)), 
                s < 0 && "second" !== a) return this._getTimeValue(0), void this.CountdownEnd();
                s - n > 0 ? this.getLatestForCountDown(s) : s - n < 0 ? this.getLatestForAddTime(s) : s - n == 0 && (n <= 0 && this._getTimeValue(s), 
                this.CountdownEnd()), i && s - n != 0 && this.init.call(this);
            } else "anniversary" === o ? "second" === a ? console.error("countdownType为".concat(o, "类型时，不可设置timeType值为second")) : (s = "string" == typeof e ? s.replace(/-/g, "/") : s, 
            (s = Math.ceil((new Date().getTime() - new Date(s).getTime()) / 1e3)) >= 0 ? (this.getLatestForCountDown(s), 
            this.init.call(this)) : console.error("time传值错误")) : console.error("错误的countdownType类型");
        },
        getLatestForAddTime: function(t) {
            var e = this.data.initAddTime;
            e !== Math.abs(t) && (e++, this._getTimeValue(e), this.setData({
                initAddTime: e
            }));
        },
        getLatestForCountDown: function(t) {
            this._getTimeValue(t), this.setData({
                time: "second" === this.data.timeType ? --t : this.data.time
            });
        },
        _getTimeValue: function(t) {
            var e = this, i = this.data.format, a = [], n = i.split(/(\{.*?\})/), o = t;
            return [ {
                key: "{%d}",
                type: "day",
                count: 86400
            }, {
                key: "{%h}",
                type: "hour",
                count: 3600
            }, {
                key: "{%m}",
                type: "minute",
                count: 60
            }, {
                key: "{%s}",
                type: "second",
                count: 1
            } ].forEach(function(t) {
                var i = e._findTimeName(n, t.key);
                if (-1 !== i) {
                    var s = n[i], r = {
                        type: t.type,
                        name: s,
                        value: parseInt(o / t.count)
                    };
                    e.data.isZeroPadd && (r.value = e.zeroPadding(r.value)), o %= t.count, a.push(r);
                }
            }), this.setData({
                date: a
            }), a;
        },
        _findTimeName: function(t, e) {
            var i = t.indexOf(e);
            return -1 === i ? -1 : i + 1;
        },
        CountdownEnd: function() {
            this.triggerEvent("linend", {});
        }
    }
});

exports.default = t;