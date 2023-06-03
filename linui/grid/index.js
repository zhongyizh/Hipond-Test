var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/hover"));

Component({
    options: {
        multipleSlots: !0
    },
    behaviors: [ e.default ],
    relations: {
        "../grid-item/index": {
            type: "child",
            linked: function() {
                this.initGrids();
            },
            unlinked: function() {
                this.initGrids();
            }
        }
    },
    externalClasses: [ "l-class", "l-class-grid", "l-grid-class" ],
    properties: {
        rowNum: {
            type: String,
            value: 3
        },
        showBorder: Boolean,
        showColBorder: Boolean,
        showRowBorder: Boolean
    },
    data: {
        gridItems: [],
        childNum: 0,
        currentIndex: -1,
        currentCell: -1
    },
    ready: function() {
        this.initGrids();
    },
    lifetimes: {
        show: function() {}
    },
    methods: {
        initGrids: function() {
            var e = this.getRelationNodes("../grid-item/index");
            if (this.data.childNum !== e.length) {
                var t = e.map(function(e, t) {
                    return e.setData({
                        index: t
                    }), {
                        index: t,
                        key: e.data.key,
                        cell: e.data.cell
                    };
                });
                this.setData({
                    gridItems: t,
                    childNum: e.length
                });
            }
        },
        tapGridItem: function(e) {
            var t = e.target.dataset.gridIndex;
            this.setData({
                currentIndex: t,
                currentCell: this.data.gridItems[t].cell
            });
        },
        tapGrid: function() {
            this.triggerEvent("lintap", {
                index: this.data.currentIndex,
                cell: this.data.currentCell
            }, {
                bubbles: !0,
                composed: !0
            }), this.setData({
                currentIndex: -1,
                currentCell: -1
            });
        }
    }
});