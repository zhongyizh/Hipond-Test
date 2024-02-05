// pages/verification/verification.js
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
			var eduPattern = /\.edu$/i;
			if (eduPattern.test(this.data.email)) {
				this.setData ({
					notice: "验证邮件已发送",
					isSuccessHidden: false
				})
			}
			else {
				this.setData ({
					notice: "需要输入正确的以.edu结尾的邮箱哦！",
					isSuccessHidden: true
				})
			}
		},
})