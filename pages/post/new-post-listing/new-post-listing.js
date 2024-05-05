// pages/new-post/new-post.js
const { postIdUrl, newListingUrl, uploadUrl } = require("../../../utils/api");
import { checkUserInfo } from '../../../utils/util'
import { getNowDate, dateToChineseCharacterFormat } from '../../../utils/date.util'
import { PostService } from '../../../services/post.service';

Page({
    data: {
        //View Models
        previewImgs: [],
        images: [],
        price: 0.00,
        condition: "全新/仅开箱",
        ddl: getNowDate(),
        body: "",
        title: "",

        bodyTextPlaceholder: "留下更详细的交易细节和物品信息…",
        actionSheetItems: ['全新/仅开箱', '良好/轻微使用', '一般/工作良好', '需修理/零件可用'],
        actionSheetHidden: true,
        displayDDL: "-"
    },
    onLoad() {
        checkUserInfo().then(res => {
            if (res && res.nickname) {
                null;
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
        });
        this.setData({ displayDDL: dateToChineseCharacterFormat(this.data.ddl) });

        //	获取所有打开的EventChannel事件
        const eventChannel = this.getOpenerEventChannel();
        // 监听 index页面定义的 toB 事件
        eventChannel.on('onPageEdit', (res) => {
            const update = {};
            Object.keys(res).forEach(key => {
                update[key] = res[key];
            });
            this.setData(update);
        })
    },

    upload: function() {
        PostService.uploadPost(this);
    },

    cancel: function() {
        wx.navigateBack();
    },

    chooseImage: function(res) {
        this.setData({
            images: res.detail.all
        })
    },

    onInputTextChanged: function(res) {
        this.data[res.currentTarget.id] = 
        (res.currentTarget.dataset.type == "number") ?
            res.detail.value :
            Number(res.detail.value);
    },
    actionSheetTap: function(e) {
        this.setData({
            actionSheetHidden: false
        });
    },
    actionSheetItemTap: function(e) {
        let clickedItem = e.currentTarget.dataset.clickedItem;
        console.log("Clicked: " + clickedItem);
        this.setData({
            actionSheetHidden: true,
            condition: clickedItem
        });
    },
    actionSheetChange: function(e) {
        console.log("取消按钮被点击");
        this.setData({
            actionSheetHidden: true
        });
    },
    bindDateChange: function(e) {
      this.setData({
        ddl: e.detail.value,
      });
      this.setData({
        displayDDL: dateToChineseCharacterFormat(this.data.ddl)
      });
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
    }
})