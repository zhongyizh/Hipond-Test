var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../core/utils/event-bus"));

Component({
    externalClasses: [ "l-class", "l-class-icon", "l-class-image", "l-icon-class", "l-image-class" ],
    options: {
        multipleSlots: !0
    },
    properties: {
        count: {
            type: Number,
            value: 5
        },
        score: {
            type: Number,
            value: 0
        },
        size: {
            type: String,
            value: "36"
        },
        disabled: Boolean,
        activeColor: {
            type: String,
            value: "#FF5252"
        },
        inActiveColor: {
            type: String,
            value: "#FFE5E5"
        },
        name: {
            type: String,
            value: "favor-fill"
        },
        activeImage: String,
        inActiveImage: String
    },
    data: {},
    methods: {
        handleClick: function(t) {
            if (!this.data.disabled) {
                var i = t.currentTarget.dataset.index;
                this.setData({
                    score: i + 1
                }), this.triggerEvent("linchange", {
                    score: i + 1
                }), e.default.emit("lin-form-change-" + this.id, this.id);
            }
        },
        getValues: function() {
            return this.data.score;
        },
        reset: function() {
            this.setData({
                score: 0
            });
        }
    }
});