const {
    newUserUrl,
    newAvatarUrl
} = require("../../utils/api");
import {
    checkUserInfo,
    checkUserVerification
} from '../../utils/util'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

Page({
    data: {
        nickname: "",
        postal_code: "",
        wechat_id: "",
        email_address: "",
        avatarUrl: defaultAvatarUrl,
        isChangeAvatar: false,
        is_verified: false,
        wechat_cb: false,
        email_cb: false,
        isDisabled: true,
        focus: false
    },
    onLoad() {
        checkUserInfo().then(res => {
            if (res && res.nickname && res.avatar_url) {
               this.setData({
                    nickname: res.nickname,
                    avatarUrl: res.avatar_url,
                    wechat_id: res.wechat_id,
                    postal_code: res.postal_code,
                    email_address: res.email_address
                })
                if (res.wechat_id != "") {
                    this.setData({
                        wechat_cb: true
                    });
                }
                if (res.email_address != "") {
                    this.setData({
                        email_cb: true
                    });
                }
                this.updateButtonStatus();
            }
        }).catch(e => {
            console.log(e);
        })
        checkUserVerification().then(res => {
            if (res && res.is_valid) {
                this.setData({
                    is_verified: res.is_valid
                })
            }
        }).catch(e => {
            console.log(e);
        })
    },
    onShow() {
        checkUserVerification().then(res => {
            if (res && res.is_valid) {
                this.setData({
                    is_verified: res.is_valid
                })
            }
        }).catch(e => {
            console.log(e);
        })
    },
    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        this.setData({
            avatarUrl,
            isChangeAvatar: true,
        })
    },
    saveUserInfo() {
        const avatar_path = this.data.avatarUrl;
        const nickname = this.data.nickname;
        const email_address = this.data.email_address;
        const wechat_id = this.data.wechat_id;
        const isChangeAvatar = this.data.isChangeAvatar;
        const postal_code = this.data.postal_code;
        wx.request({
            filePath: avatar_path,
            url: newUserUrl,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'token': wx.getStorageSync('token'),
            },
            data: {
                'nickname': nickname,
                'email_address': email_address,
                'wechat_id': wechat_id,
                'postal_code': postal_code
            },
            success: function (res) {
                if (!isChangeAvatar) {
                    wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000,
                    });
                }
            },
            fail: function (res) {
                if (!isChangeAvatar) {
                    wx.showToast({
                        title: '保存失败',
                        icon: 'none',
                        duration: 2000,
                    });
                }
                console.log(res)
            },
        })

        if (isChangeAvatar) {
            wx.uploadFile({
                filePath: avatar_path,
                name: 'file',
                url: newAvatarUrl,
                header: {
                    'Content-Type': 'multipart/form-data; charset=utf-8',
                    'token': wx.getStorageSync('token'),
                },
                success: function (res) {
                    wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000,
                    });
                },
                fail: function (res) {
                    wx.showToast({
                        title: '保存失败',
                        icon: 'none',
                        duration: 2000,
                    });
                    console.log(res)
                },
            })
            this.setData({
                isChangeAvatar: false,
            })
        }

        wx.navigateBack();
    },
    nicknameChange(res) {
        var textVal = res.detail.value;
        this.setData({
            nickname: textVal
        })
        this.updateButtonStatus();

    },
    wechat_idChange(res) {
        var textVal = res.detail.value;

        this.setData({
            wechat_id: textVal
        })
        this.updateButtonStatus();

    },

    emailChange(res) {
        var textVal = res.detail.value;
        this.setData({
            email_address: textVal
        })
        this.updateButtonStatus();

    },

    postal_codeChange(res) {
        var textVal = res.detail.value;
        this.setData({
            postal_code: textVal
        })
        this.updateButtonStatus();

    },

    onCancelBtnClick: function () {
        wx.navigateBack();
    },

    checkboxChange: function (e) {

        const items = e.detail.value;
        this.data.wechat_cb = false;
        this.data.email_cb = false;
        for (let i = 0; i < items.length; i++) {
            // 根据 items[i] 的值判断是哪个复选框被选中或取消
            if (items[i] === "cb-wechat-id") {
                this.data.wechat_cb = true
            } else if (items[i] === "cb-email") {
                this.data.email_cb = true
            }
        }
        this.updateButtonStatus();
    },

    updateButtonStatus: function () {
        // 按钮启用条件: 两个输入框不为空且两个复选框都被选中
        this.setData({
            isDisabled: true
        });
        if (this.data.nickname != "") {
            if (this.data.wechat_cb && this.data.wechat_id != "") {
                this.setData({
                    isDisabled: false
                });
            }
            if (this.data.email_cb && this.data.email_address != "") {
                this.setData({
                    isDisabled: false
                });
            }
        }
    },

    handleTouchInput() {
        if (wx.requirePrivacyAuthorize) {
          wx.requirePrivacyAuthorize({
            success: res => {
              console.log('用户同意了隐私协议 或 无需用户同意隐私协议')
              // 用户同意隐私协议后给昵称input聚焦
              this.setData({
                focus: true
              })
            },
            fail: res => {
              console.log('用户拒绝了隐私协议')
            }
          })
        } else {
          this.setData({
            focus: true
          })
        }
      },
})