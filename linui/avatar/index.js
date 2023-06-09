Component({
    externalClasses: [ "l-class", "l-class-text", "l-text-class" ],
    properties: {
        icon: String,
        iconColor: {
            type: String,
            value: "#3963BC"
        },
        iconSize: {
            type: String,
            value: "28"
        },
        text: String,
        src: String,
        openData: {
            type: Array,
            observer: "_initOpenData"
        },
        shape: {
            type: String,
            value: "circle"
        },
        mode: {
            type: String,
            value: "scaleToFill"
        },
        size: {
            type: Number,
            value: 120
        },
        placement: {
            type: String,
            value: "right"
        }
    },
    data: {
        _isHaveUserNickName: !1,
        _isHaveUserAvatarUrl: !1,
        _iconSize: "",
        _iconColor: "#ffffff"
    },
    methods: {
        _initOpenData: function(e) {
            this._isHaveUserAvatarUrl(e), this._isHaveUserNickName(e);
        },
        _isHaveUserAvatarUrl: function(e) {
            this.setData({
                _isHaveUserAvatarUrl: -1 !== e.indexOf("userAvatarUrl")
            });
        },
        _isHaveUserNickName: function(e) {
            this.setData({
                _isHaveUserNickName: -1 !== e.indexOf("userNickName")
            });
        },
        tapAvatar: function(e) {
            this.triggerEvent("lintap", e, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});