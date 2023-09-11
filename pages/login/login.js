const { newUserUrl, newAvatarUrl } = require("../../utils/api");
import { checkUserInfo } from '../../utils/util'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

Page({
    data: {
        nickname: "",
        contactInfo: "",
        avatarUrl: defaultAvatarUrl,
        isChangeAvatar: false,
    },
    onLoad() {
        checkUserInfo().then(res => {
            if (res && res.nickname && res.avatar_url)
            {
                this.setData({
                    nickname: res.nickname,
                    avatarUrl: res.avatar_url,
                    contactInfo: res.contact_info,
                })
            }
        }).catch(e => {
            console.log(e);
        })
    },
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail 
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

    onCancelBtnClick: function() {
        wx.navigateBack();
    },
  })