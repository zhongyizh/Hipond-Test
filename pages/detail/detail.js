// pages/detail.js
const { detailsUrl, incrementViewCountUrl } = require("../../utils/api");
Page({
    data: {
      post_id: null,
      nickname: '',
      avatar_url: '',
      text: '',
      body: '',
      condition: '',
      condition_forDisplay: "",
      condition_iconPath: "",
      ddl: '',
      ddl_forDisplay: "",
      isUrgent: true,
      location: '未知地点',
      image_urls: [],
      post_status: 0,
      contact_info: "",
      post_type: "",
      user_status: false
    },
  
    onLoad: function (options) {
      const post_id = options.post_id;
      if (post_id) {
        this.setData({ post_id });
        this.fetchPostDetails(post_id);
        wx.request({
          url: incrementViewCountUrl + '/' + post_id,
          method: 'POST',
          success: function(res) {
              // Check the response and navigate to the detail page
              if (!res.data.success) {
                  // Handle error (e.g., post not found or server error)
                  console.error('Error incrementing view count:', res);
              }
          },
          fail: function(err) {
              // Handle the failure of the request
              console.error('Request failed', err);
          }
        });
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
            that.setData({
              nickname: res.data.nickname,
              avatar_url: res.data.avatar_url,
              text: res.data.text,
							body: res.data.body,
              image_urls: res.data.image_urls,
              user_status: res.data.user_status,
						});
						// 价格
						if (res.data.price) {
							that.setData({
								price: "$ " + res.data.price
							});
						}
						// 发布日期
						if (res.data.post_date) {
							var dateObject = new Date(parseInt(res.data.post_date));
							// Get the Year, Month, and Day components
							var year = dateObject.getFullYear();
							var month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-indexed month
							var day = ('0' + dateObject.getDate()).slice(-2);
							that.setData({
								post_date: "发布于" + month + '/' + day + '/' + year
							});
						}
						// 地点
						if (res.data.location) {
							that.setData({
								location: res.data.location
							});
						}
          }
        },
        fail: function (error) {
          console.error("Failed to fetch details:", error);
        }
      });
    },
    interaction: function(e) {
      const that = this;
      if (that.data.post_status == 0)
      {
          wx.setClipboardData({
              data: that.data.contact_info,
              success: function(){
                wx.showToast({
                    title: '复制成功',  
                    icon: 'success',    
                    duration: 2000,
                  });
              }
            })
      }
      else if (that.data.post_status == 1) {
          wx.showToast({
              title: '物品正在On Hold, 先收藏晚些再看吧~',  
              icon: 'none',    
              duration: 2000,
            });
      } 
  }
});
  