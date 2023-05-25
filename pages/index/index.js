// index.js

const { uploadUrl, listUrl, detailsUrl } = require("../../utils/api");

// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    previewImgs: [],
    imgPaths: [],
    userName: "TestUser",
    textVal:"",
    posts: [],
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
      this.getUserProfile();
    }

    this.loadPosts();
  },
  getUserProfile(e) {
    console.log("getUserProfile")
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  chooseImg: function() {
    var t = this;
    wx.chooseMedia({
        count: 9,
        mediaType: ['image','video'],
        sourceTygetUserProfilepe: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
            var imageInfo = res.tempFiles;
            imageInfo.forEach(img => {
                t.setData({
                    previewImgs: [...t.data.previewImgs, img],
                    imgPaths: [...t.data.imgPaths, img.tempFilePath]
                })
            });
        }
      })
    },
    upload: function() {
        var filePaths = this.data.imgPaths;

        var textVal = this.data.textVal;
        console.log("Text Input: " + textVal);

        var userName = this.data.userName;
        console.log("Username: " + userName);

        filePaths.forEach(path => {
            wx.uploadFile({
                url: uploadUrl,
                filePath: path,
                name: 'file',
                header: {
                  'Content-Type': 'multipart/form-data',
                  'user_id': this.data.userName,
                  'post_id': 1,
                  'text': this.data.textVal,
                },
                formData: {
    
                },
                success: function (res) {
                  wx.showToast({
                    title: 'File uploaded successfully',
                    icon: 'success',
                    duration: 2000,
                  });
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

        //   this.loadPosts();
    },
    previewImg: function(res) {
        var img = this.data.imgPaths;
        // console.log(img)
        wx.previewImage({
          current: img,
          urls: [img]
        })
    },
    inputText: function(res) {
        var textVal = res.detail.value;
        this.data.textVal = textVal;
        // console.log("Text Input: " + textVal);
    },
    loadPosts: function() {
        // Load all posts from backend
        wx.request({
            url: listUrl,
            method: 'GET',
            header: {
              'content-type': 'application/json',
              'user_id': 'user1' // replace with the actual user ID
            },
            success: res => {
                const postIds = res.data.post_ids
                // request details for each post
                postIds.forEach(postId => {
                    wx.request({
                        url: detailsUrl + '/' + postId,
                        method: 'GET',
                        header: {
                            'content-type': 'application/json',
                        },
                        success: (res) => {
                            const post = res.data
                            console.log(post)
                            // add the post to the list
                            this.setData({
                                posts: [...this.data.posts, post]
                            })
                        }
                    })
                })
            },
            fail: err => {
                console.log(err)
                wx.showToast({
                    title: 'Failed to load posts!',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
})
