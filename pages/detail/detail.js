// pages/detail.js
const {
    detailsUrl,
    userInfoUrl
} = require("../../utils/api");
Page({
    data: {
        post_id: null,
        nickname: '',
        avatar_url: '',
        text: '',
        body: '',
        location: '未知地点',
        image_urls: [],
        post_status: 0,
        contact_info: ""
    },

    onLoad: function (options) {
        const post_id = options.post_id;
        if (post_id) {
            this.setData({
                post_id
            });
            this.fetchPostDetails(post_id);
        }
    },

    onCancelBtnClick: function () {
        wx.navigateBack();
    },

    fetchPostDetails: function (post_id) {
        const that = this;
        wx.request({
            url: `${detailsUrl}/${post_id}`,
            method: 'GET',
            success: function (res) {
                if (res.statusCode === 200 && res.data) {
                    let displayPrice = res.data.price == null || res.data.price == "NaN" ? "面议" : "$ " + res.data.price;
                    // let contact = "微信号: " + res.data.contact_info["wechat_id"] + "邮箱：" + res.data.contact_info["email_address"]
                    let contact = "微信号: " + "123" + "邮箱：" + ""

                    that.setData({
                        nickname: res.data.nickname,
                        avatar_url: res.data.avatar_url,
                        text: res.data.text,
                        body: res.data.body,
                        image_urls: res.data.image_urls,
                        post_status: res.data.post_status,
                        contact_info: contact
                    });

                    if (res.data.price) {
                        that.setData({
                            price: displayPrice
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