const api = require("./api");

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function userLogin() {
    var t = this;
    wx.login({
        async success(res) {
            if (res.code) {
                // Send the code to the backend
                wx.request({
                    url: api.loginUrl,
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success(response) {
                        if (response.statusCode === 200) {
                            const data = response.data;
                            if (data.token) {
                                wx.setStorageSync('token', data.token);
                            } else {
                                console.log('Token not received');
                            }
                        } else {
                            console.log('登录失败！');
                        }
                    },
                    fail() {
                        console.log('登录失败！');
                    }
                });
            } else {
                console.log('登录失败！ ' + res.errMsg);
            }
        }
    });
}

export function checkLoginStatus() {
    wx.checkSession({
        success () {
            // session_key 未过期，并且在本生命周期一直有效
            userLogin(); 
            return;
        },
        fail () {
            // session_key 已经失效，需要重新执行登录流程
            console.log('Session expired. Login again.')
            userLogin(); // 重新登录
        }
    })
}

const checkUserInfo = () => {
    checkLoginStatus();
    var token = wx.getStorageSync('token');
    wx.showLoading({
        title: '获取用户信息中，请耐心等待...',
    });
    return new Promise((resolve, reject) => {
        wx.request({
          url: api.userInfoUrl,
          method: 'GET',
          header: {
              token: token
          },
          complete: (res) => {
            wx.hideLoading();
            if (res.statusCode === 200 && res.data && res.data.nickname && res.data.avatar_url) {
                resolve(res.data)
            } else {
                console.log('Failed to get user info!');
                reject(res)
            }
          }
        })
    })
}

module.exports = {
    formatTime,
    formatNumber,
    checkLoginStatus,
    checkUserInfo,
}
