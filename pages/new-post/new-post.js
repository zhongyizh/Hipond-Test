// pages/new-post/new-post.js
const { postIdUrl, newPostUrl, uploadUrl } = require("../../utils/api");
import { checkUserInfo } from '../../utils/util'

Page({
    data: {
        previewImgs: [],
        images: [],
        textVal:"",
        posts: [],
    },
  
    onLoad() {
        checkUserInfo().then(res => {
            if (res && res.nickname) {

            }
            else {
                wx.navigateTo({
                    url: "/pages/login/login",
                })
            }
        }).catch(e => {
            console.log(e);
        })
    },

    upload: function() {
        var images = this.data.images;
        console.log("Image paths: " + images);

        var textVal = this.data.textVal;
        console.log("Text input: " + textVal);

        var token = wx.getStorageSync('token');
        console.log("Token: " + token);

        wx.request({
            url: postIdUrl,
            method: 'POST',
            success(response) {
                if (response.statusCode === 200) {
                    var postId = response.data.post_id;
                    console.log("Get new post id: " + postId);
                    
                    wx.request({
                        url: newPostUrl,
                        method: 'POST',
                        header: {
                            'Content-Type': 'multipart/form-data',
                            'post-id': postId,
                            'token': token,
                            'text': textVal,
                        },
                        success(response) {
                            images.forEach(img => {
                                wx.uploadFile({
                                    url: uploadUrl,
                                    filePath: img.url,
                                    name: 'file',
                                    header: {
                                      'Content-Type': 'multipart/form-data',
                                      'post-id': postId,
                                    },
                                    success: function (res) {
                                        console.log('Image uploaded: ' + img.url)
                                    },
                                    fail: function (res) {
                                      wx.showToast({
                                        title: 'Error uploading file',
                                        icon: 'none',
                                        duration: 2000,
                                      });
                                    },
                                  });
                            });

                            wx.showToast({
                                title: 'Post uploaded successfully',
                                icon: 'success',
                                duration: 2000,
                            });
                        },
                        fail() {
                            console.log('Failed to add new post!');
                            wx.showToast({
                                title: 'Error uploading post',
                                icon: 'none',
                                duration: 2000,
                            });
                        }
                    });
                } else {
                    console.log('Failed to get post id!');
                }
            },
            fail() {
                console.log('Failed to get post id!');
            }
        });
    },

    cancel: function() {
        wx.navigateBack();
    },

    chooseImage: function(res) {
        this.setData({
            images: res.detail.all
        })
    },

    inputText: function(res) {
        var textVal = res.detail.value;
        this.data.textVal = textVal;
    },
})
