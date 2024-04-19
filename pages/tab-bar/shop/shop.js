// pages/tab-bar/shop/shop.js
Page({
    data: {
      cur_tabbar_index: 3,
      currentTheme: 'moving',
      sliderWidth: 172, // Initial value; adjust as necessary
      themes: {
        'moving': [
          { id: "0", title: "床品包", description: "This is card 1 for Moving", img: "/image/moving1.png" },
          { id: "1", title: "日用品包", description: "This is card 2 for Moving", img: "/image/moving2.png" },
          { id: "2", title: "消耗品包", description: "This is card 3 for Moving", img: "/image/moving3.png" }
        ],
        'other': [
          { id: "0", title: "Card 1", description: "This is card 1 for Other Theme", img: "/image/moving1.png" },
          { id: "1", title: "Card 2", description: "This is card 2 for Other Theme", img: "/image/moving2.png" },
          { id: "2", title: "Card 3", description: "This is card 3 for Other Theme", img: "/image/moving3.png" }
        ]
      },
      currentSwiperIndex: 0, // Track the current index
      indicatorWidth: 0, // Initial value for the indicator's width
      indicatorPosition: 0, // Initial value for the indicator's position
    },
  
    // Function to handle theme selection
    selectTheme: function(e) {
      const theme = e.currentTarget.dataset.theme;
      this.setData({
        currentTheme: theme,
      }, () => {
        this.adjustSliderWidth(theme);
      });
    },

    adjustSliderWidth: function(theme) {
      const query = this.createSelectorQuery();
      const optionId = theme === 'moving' ? 'option1' : 'option2';
      query.select(`#${optionId}`).boundingClientRect();
      query.exec((res) => {
        if (res[0]) {
        const width = res[0].width;
        this.setData({ sliderWidth: width });
        } else {
          console.error('Element not found:', optionId);
        }
      });
    },

    swiperChange: function(e) {
      this.setData({
        currentSwiperIndex: e.detail.current,
      });
      this.calculateIndicator();
    },
    calculateIndicator: function() {
      const totalItems = this.data.themes[this.data.currentTheme].length;
      const itemWidth = 100 / totalItems; // Assuming equal width for all items
      const currentPosition = (100 / totalItems) * this.data.currentSwiperIndex;
  
      this.setData({
        indicatorWidth: itemWidth,
        indicatorPosition: currentPosition,
      });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (typeof this.getTabBar === 'function') {
        this.getTabBar((tabBar) => {
          tabBar.setData({
            selected: this.data.cur_tabbar_index
          })
        })
      } else{
        console.error('TabBar not found');
      };
      this.adjustSliderWidth(this.data.currentTheme);
      this.calculateIndicator();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      this.calculateIndicator();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})