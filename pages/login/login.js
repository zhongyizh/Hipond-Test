const { loginUrl, addUserUrl } = require("../../utils/api");

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

Page({
    data: {
        userid: "",
        nickname: "",
        contactInfo: "",
        avatarUrl: defaultAvatarUrl,
    },
    onLoad() {
        var t = this;
        wx.login({
          success(res) {
            if (res.code) {
              // Send the code to the backend
              wx.request({
                url: loginUrl,
                method: 'POST',
                data: {
                  code: res.code
                },
                success(response) {
                  if (response.statusCode === 200) {
                    const data = response.data;
                    if (data.session) {
                        const userid = data.user_id;
                        const nickname = data.nickname;
                        const avatarUrl = data.avatar_url;
                        const contactInfo = data.contact_info;
  
                        // Check if any of the user information is empty
                        if (!nickname || !avatarUrl || !contactInfo) {
                            // Handle empty user information
                            console.log('User information is empty');
                        } else {
                            // User information is available, proceed with desired logic
                            t.setData ({
                                nickname: nickname,
                                contactInfo: contactInfo
                            })
                            wx.downloadFile({
                                url: avatarUrl,
                                success (res) {
                                    if (res.statusCode === 200) {
                                        t.setData ({
                                            avatarUrl: res.tempFilePath
                                        })
                                    }
                                }
                              })
                        }
                        t.data.userid = userid;
                        console.log('登录成功！');
                    } else {
                      console.log('Session not received');
                    }
                  } else {
                    console.log('登录失败！');
                  }
                },
                fail() {
                  console.log('登录失败！');
                }
              });
            } else {
              console.log('登录失败！' + res.errMsg);
            }
          }
        });
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail 
      this.setData({
        avatarUrl,
      })
    },
    saveUserInfo() {
        var avatar_path = this.data.avatarUrl;
        var user_id = this.data.userid;
        var nickname = this.data.nickname;
        var contact_info = this.data.contactInfo;

        wx.uploadFile({
            filePath: avatar_path,
            url: addUserUrl,
            name: 'file',
            header: {
                'Content-Type': 'multipart/form-data',
                'user_id': user_id,
                'nickname': nickname,
                'contact_info': contact_info,
            },
            formData: {

            },
            success: function (res) {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000,
                });
            },
            fail: function (res) {
                console.log(res)
                wx.showToast({
                    title: '保存失败',
                    icon: 'none',
                    duration: 2000,
                });
            },
        });
    },
    nicknameChange(res) {
        var textVal = res.detail.value;
        this.setData ({
            nickname: textVal
        })
    },
    contactChange(res) {
        var textVal = res.detail.value;
        this.setData ({
            contactInfo: textVal
        })
    },
  })