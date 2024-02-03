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
              price: "$ " + res.data.price,
              body: res.data.body,
              location: res.data.location,
              post_date: "发布于" + res.data.post_date
            });
          }
        },
        fail: function (error) {
          console.error("Failed to fetch details:", error);
        }
      });
    }
});
  