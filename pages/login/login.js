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
        p_code: "",
        wechat_id: "",
        email_address: "",
        avatarUrl: defaultAvatarUrl,
        isChangeAvatar: false,
        is_verified: false,
        wechat_cb: false,
        email_cb: false,
        isDisabled: true
    },
    onLoad() {
        checkUserInfo().then(res => {
            if (res && res.nickname && res.avatar_url) {
                this.setData({
                    nickname: res.nickname,
                    avatarUrl: res.avatar_url,
                    contactInfo: res.contact_info,
                })
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
        const contact_info = this.data.contactInfo;
        const isChangeAvatar = this.data.isChangeAvatar;

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
                'contact-info': contact_info,
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
    contactChange(res) {
        var textVal = res.detail.value;
        this.setData({
            contactInfo: textVal
        })
        this.updateButtonStatus();

    },

    onCancelBtnClick: function () {
        wx.navigateBack();
    },

    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        // e.detail.value 是一个数组，包含了所有选中的复选框的value属性值
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

    updateButtonStatus: function() {
        // 按钮启用条件: 两个输入框不为空且两个复选框都被选中
        if(this.data.nickname != "" && this.data.contactChange != "")
        {
            console.log("2 C MET")
            if(this.data.wechat_cb || this.data.email_cb)
            {
                this.setData({
                    isDisabled: false
                  });
            }
        }
        
      }
})