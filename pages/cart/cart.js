// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting
} from '../../utils/asncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        await openSetting();
      } else {}
      const address = await chooseAddress();
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  }
})