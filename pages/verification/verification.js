// pages/verification/verification.js

const { verifyEmailUrl } = require("../../utils/api");

Page({
    data: {
			email: "",
			notice: "",
			isSuccessHidden: "true",
		},

		onCancelBtnClick: function() {
			wx.navigateBack();
		},
		
		emailChange(res) {
			var textVal = res.detail.value;
			this.setData ({
					email: textVal
			})
		},

		emailConfirm(res) {
			const t = this;
			const email = this.data.email;

			// Contains .edu (case insensitive)
			var eduPattern = /\.edu$/i;
			if (eduPattern.test(this.data.email)) {
				wx.request({
					url: verifyEmailUrl,
					method: 'POST',
					header: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
							'token': wx.getStorageSync('token'),
					},
					data: {
							'email': email,
					},
					success: function (res) {
						if (res.data && res.data.error) {
							console.log(res.data.error)
							t.setData ({
								notice: "验证失败，请检查邮箱地址并重试！",
								isSuccessHidden: true
							})
						}
						else {
							t.setData ({
								notice: "等待验证完成...",
								isSuccessHidden: false
							})
						}
					},
					fail: function (res) {
						t.setData ({
							notice: "验证失败，请检查邮箱地址并重试！",
							isSuccessHidden: true
						})
					},
				})
			}
			else {
				t.setData ({
					notice: "需要输入正确的以.edu结尾的邮箱哦！",
					isSuccessHidden: true
				})
			}
		},
})