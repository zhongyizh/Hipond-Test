var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/hover"));

Component({
    behaviors: [ e.default ],
    relations: {
        "../list/index": {
            type: "parent",
            linked: function() {},
            linkChanged: function() {},
            unlinked: function() {}
        }
    },
    options: {
        multipleSlots: !0
    },
    externalClasses: [ "l-class", "l-class-icon", "l-icon-class", "l-class-image", "l-image-class", "l-class-right", "l-right-class", "l-class-content", "l-content-class", "l-class-desc", "l-desc-class" ],
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
        image: String,
        title: String,
        desc: String,
        tagPosition: {
            type: String,
            value: "left"
        },
        tagContent: String,
        tagShape: {
            type: String,
            value: "square"
        },
        tagColor: String,
        tagPlain: Boolean,
        badgePosition: {
            type: String,
            value: "left"
        },
        dotBadge: Boolean,
        badgeCount: Number,
        badgeMaxCount: {
            type: Number,
            value: 99
        },
        badgeCountType: {
            type: String,
            value: "overflow"
        },
        rightDesc: String,
        gap: Number,
        leftGap: Number,
        rightGap: Number,
        isLink: {
            type: Boolean,
            value: !0
        },
        linkType: {
            type: String,
            value: "navigateTo"
        },
        url: String
    },
    methods: {
        tapcell: function(e) {
            var t = e.currentTarget.dataset, l = t.linkType, n = t.url;
            n && wx[l]({
                url: n
            }), this.triggerEvent("lintap", {
                e: e
            }, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});