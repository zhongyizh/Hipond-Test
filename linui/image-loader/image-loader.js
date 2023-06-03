Component({
    properties: {
        prevImage: {
            type: String,
            value: ""
        },
        src: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: "widthFix"
        },
        imageStyle: {
            type: String,
            value: ""
        },
        loaded: {
            type: String,
            value: "false"
        },
        index: {
            type: Number,
            value: 0
        }
    },
    data: {},
    attached: function() {},
    methods: {
        _loadComplete: function(e) {
            this.setData({
                loaded: "true"
            }), this.triggerEvent("bindload", e);
        }
    }
});