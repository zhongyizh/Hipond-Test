const { newUserUrl } = require("../../utils/api");
import { checkUserInfo } from '../../utils/util'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

Page({
    data: {
        nickname: "",
        contactInfo: "",
        avatarUrl: defaultAvatarUrl,
    },
    onLoad() {
        checkUserInfo().then(res => {
            if (res && res.nickname && res.avatar_url)
            {
                this.setData({
                    nickname: decodeURIComponent(res.nickname),
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
      })
    },
    saveUserInfo() {
        var avatar_path = this.data.avatarUrl;
        var nickname = this.data.nickname;
        var contact_info = this.data.contactInfo;

        wx.uploadFile({
            filePath: avatar_path,
            url: newUserUrl,
            name: 'file',
            header: {
                'Content-Type': 'multipart/form-data; charset=utf-8',
                'token': wx.getStorageSync('token'),
                'nickname': encodeURIComponent(nickname),
                'contact-info': contact_info,
            },
            formData: {},
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
  })