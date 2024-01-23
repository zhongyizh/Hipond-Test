// pages/detail.js
const { detailsUrl } = require("../../utils/api");

Page({
    data: {
      post_id: null,
      nickname: '',
      avatar_url: '',
      text: '',
      image_urls: []
    },
  
    onLoad: function (options) {
      const post_id = options.post_id;
      if (post_id) {
        this.setData({ post_id });
        this.fetchPostDetails(post_id);
      }
    },

    navigateBack: function() {
        wx.navigateBack();
    },
  
    fetchPostDetails: function (post_id) {
      const that = this;
      wx.request({
        url: `${detailsUrl}/${post_id}`,
        method: 'GET',
        success: function (res) {
          if (res.statusCode === 200 && res.data) {
            that.setData({
              nickname: res.data.nickname,
              avatar_url: res.data.avatar_url,
              text: res.data.text,
              image_urls: res.data.image_urls,
              price: "$ " + 99.99,
              body: "#损耗程度\
              资度委器该件府立标极，场都回快基约至坚。 节为保元酸设建林，人五周民论任六着同观，头权T雪求大利露。 \
              #产品信息\
              员单变才月照龙有展海想增太算面，行件到住备进新J活力规九实。了组该边斯也层求知务议，育因加分更酸利加矿，离周蠢造队均板需结。\
              #交易方式\
              件当了音争风步空提风能本属天究儿，细为关制很少现Y来团么矿数也。",
              location: "Arlington, VA",
              post_date: "发布于" + "1/21/2024"
            });
          }
        },
        fail: function (error) {
          console.error("Failed to fetch details:", error);
        }
      });
    }
});
  