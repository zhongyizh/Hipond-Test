// pages/detail.js
const { detailsUrl } = require("../../utils/api");
Page({
    data: {
      post_id: null,
      nickname: '',
      avatar_url: '',
      text: '',
      image_urls: [],
      price: 0,
      body: '',
      location: '',
      post_date: '',
      contact_info: '',
      post_status: '',
    },
  
    onLoad: function (options) {
      const post_id = options.post_id;
      if (post_id) {
        this.setData({ post_id });
        this.fetchPostDetails(post_id);
      }
    },

    onCancelBtnClick: function() {
        wx.navigateBack();
    },
  
    fetchPostDetails: function (post_id) {
      const that = this;
      wx.request({
        url: `${detailsUrl}/${post_id}`,
        method: 'GET',
        success: function (res) {
          if (res.statusCode === 200 && res.data) {
            let displayPrice = res.data.price === 0 || res.data.price == null ? "面议" : "$ " + res.data.price;
            let post_status = ""

            switch(0)
            {
                case 0:
                    post_status = "联系TA";
                    break;
                case 1:
                    post_status = "On Hold";
                    break;
                case 2:
                    post_status = "已出售"
                    break;
            }
            that.setData({
              nickname: res.data.nickname,
              avatar_url: res.data.avatar_url,
              text: res.data.text,
              image_urls: res.data.image_urls,
              price: displayPrice,
              body: res.data.body,
              location: res.data.location,
              post_date: "发布于" + res.data.post_date,
              post_status: post_status,
              contact_info:"微信：" + "test_wechat_id" + "邮箱：xxx@xxx.edu"
            });
          }
        },
        fail: function (error) {
          console.error("Failed to fetch details:", error);
        }
      });
    },

    interaction: function(e) {
        const that = this;
        wx.setClipboardData({
          data: that.contact_info,
          success: function(){
            wx.showToast({
                title: '复制成功',  
                icon: 'success',    
                duration: 1500,
              });
          }
        })
    }

});
  