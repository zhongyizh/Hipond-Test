// utils/post.service.js
const { postIdUrl, newListingUrl, uploadUrl } = require("../utils/api");

const TOAST_DURATION = 2000;
export class PostService {
    static summarizePostForm(component) {
        return {
            'text': component.data.title,
            'body': component.data.body,
            'price': component.data.price,
            'location': "",
            'condition': component.data.condition,
            'expiration_date': component.data.ddl,
            'post_date': Date.now()
        };
    }

    static validateForm(payloads) {
        const errMsg = new Map([
            ["text", "标题不能为空"],
            ["body", "需要物品描述"],
            ["price", "请输入价格"],
            ["image", "请选至少一张图"]
        ]);

        console.log("Validating Form Content before Submission...");
        for (const [key, value] of Object.entries(payloads[0])) {
            if (errMsg.has(key) && value === "") {
                wx.showToast({
                    title: errMsg.get(key),
                    icon: 'error',
                    duration: TOAST_DURATION
                });
                return false;
            }
        }
        if (payloads[1].length <= 0) {
            wx.showToast({
                title: errMsg.get("image"),
                icon: 'error',
                duration: TOAST_DURATION
            });
            return false;
        }
        return true;
    }

    static async uploadImage(images, postId) {
        const uploadPromises = images.map(img => {
            return new Promise((resolve, reject) => {
                wx.uploadFile({
                    url: uploadUrl,
                    filePath: img.url,
                    name: 'file',
                    header: {
                        'Content-Type': 'multipart/form-data',
                        'post-id': postId,
                    },
                    success: res => {
                        if (res.statusCode === 200) resolve();
                        else reject(new Error('Error uploading file'));
                    },
                    fail: reject
                });
            });
        });

        try 
        {
            await Promise.all(uploadPromises);
            wx.showToast({
                title: 'All images uploaded successfully',
                icon: 'success',
                duration: TOAST_DURATION,
            });
        } 
        catch (error) {
            wx.showToast({
                title: 'Error uploading images',
                icon: 'none',
                duration: TOAST_DURATION,
            });
            console.error('Upload failed for some images:', error);
        }
    }

    static async uploadPost(component) {
        const payload = PostService.summarizePostForm(component);
        const images = component.data.images;
		const token = wx.getStorageSync('token');

        if (!PostService.validateForm([payload, images])) return;

        try 
        {
			// 向服务器请求一个新帖子的ID
            const postRequest = await new Promise((resolve, reject) => {
                wx.request({
                    url: postIdUrl,
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        'Authorization': token
                    },
                    data: payload,
                    success: res => res.statusCode === 200 ? resolve(res.data.post_id) : reject(new Error('Failed to get post id')),
                    fail: reject
                });
            });

			// 上传帖子本体（除图片外的部分）
            await new Promise((resolve, reject) => {
                wx.request({
                    url: newListingUrl,
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        'post-id': postRequest,
                        'Authorization': token,
                    },
                    data: payload,
                    success: res => res.statusCode === 200 ? resolve() : reject(new Error('Failed to add new post')),
                    fail: reject
                });
            });

			// 上传帖子图片
            await PostService.uploadImage(images, postRequest);
            wx.showToast({
                title: 'Post uploaded successfully',
                icon: 'success',
                duration: TOAST_DURATION,
            });
            wx.navigateBack();
        } 
        catch (error) 
        {
            wx.showToast({
                title: error.message || 'Network error',
                icon: 'none',
                duration: TOAST_DURATION,
            });
            console.error('Error in uploadPost:', error);
        }
    }
}
