// pages/new-post/new-post.js
const { postIdUrl, newPostUrl, uploadUrl } = require("../../../utils/api");
import { checkUserInfo } from '../../../utils/util'

Page({
    data: {
        previewImgs: [],
        images: [],
        price: 0.00,
        body:"",
        title: "",
        posts: [],
        bodyTextPlaceholder: "留下更详细的交易细节和物品信息…"
    },
    onLoad() {
        checkUserInfo().then(res => {
            if (res && res.nickname) {

            }
            else {
                console.log("Failed to get username")
                wx.navigateTo({
                    url: "/pages/login/login",
                })
            }
        }).catch(e => {
            console.log(e);
            wx.navigateTo({
                url: "/pages/login/login",
            })
        })
    },

    validateForm: function(payloads) {
		const errMsg = new Map([
			["text", "标题不能为空"],
			["body", "需要物品描述"],
			["price", "请输入价格"],
			["image", "请选至少一张图"]
		]);
		console.log(`Validating Form Content before Submission: \n Payloads: ${payloads}`);
		for (const [key, value] of Object.entries(payloads[0])) {
			if (errMsg.has(key))
				if (value == "") {
					wx.showToast({
						title: errMsg.get(key),
						icon: 'error',
						duration: 2000
					});
					return false;
				}
		}
		if (payloads[1].length <= 0) {
			wx.showToast({
				title: errMsg.get("image"),
				icon: 'error',
				duration: 2000
			});
			return false;
		}
		return true;
    },

    upload: function() {
        var payload = {
          'text': this.data.title,
          'body': this.data.body,
          'price': this.data.price,
          'location': "",
          'post_date': Date.now()
        }

        var images = this.data.images;
        console.log("Image paths: " + images);

        var token = wx.getStorageSync('token');
        console.log("Token: " + token);

        if (!this.validateForm([payload, images])) return false;

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
                            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                            'post-id': postId,
                            'token': token,
                        },
                        data: payload,
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
                                        if (res.statusCode != 200)
                                        {
                                            // Handle possible backend 413 error
                                            console.log('Error uploading file')
                                            console.log(res)
                                        }
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
        wx.navigateBack();
    },

    cancel: function() {
        wx.navigateBack();
    },

    chooseImage: function(res) {
        this.setData({
            images: res.detail.all
        })
    },

    onOversize: async function(event) {
        let tempFiles = this.data.images;
        if (tempFiles.length) {
            for (let i = 0; i < tempFiles.length; i++) {
                let filePath = tempFiles[i].url
                if (tempFiles[i].overSize) {
                    filePath = await this.compressFile(filePath, i, tempFiles[i].imageSize)
                    wx.getFileInfo({
                        filePath: filePath,
                        success (e) {
                            tempFiles[i].url = filePath
                            tempFiles[i].imageSize = e.size
                            tempFiles[i].overSize = e.size > 2000000
                        }
                    })
                    this.setData({
                        images: tempFiles,
                    })
                }
            }
        }
    },

    compressFile(src, size) {
        // Can expand depending on the situation
        return new Promise((resolve) => {
            wx.getImageInfo({
                src,
                complete: () => {
                    this.compressImage(src, size).then(res => {
                        resolve(res)
                    })
                }
            })
        })
    },

    compressImage(src, size) {
        // Use wx.compressImage to compress
        return new Promise((resolve, reject) => {
            let quality = 100
            let temp = 30 - parseInt(size / 1024 / 1024)
            quality = temp < 10 ? 10 : temp
            wx.compressImage({
                src,
                quality,
                success: function (res) {
                    resolve(res.tempFilePath)
                },
                fail: function (err) {
                    resolve(src)
                }
            })
        })
    },

    inputText: function(res) {
        switch(res.currentTarget.id) {
          case "body":
              this.data.body = res.detail.value;
              break;  
          case "price":
              this.data.price = Number(res.detail.value);
              break;  
          case "title":
              this.data.title = res.detail.value;
              break;
          default: 
              console.error("Unrecognized Input Box id");
              break;
        }
    },
})
