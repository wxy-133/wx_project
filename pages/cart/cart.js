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
      address:{}
  },
  onLoad: function (options) { },
  onShow(){
     const address=wx.getStorageSync('address')
     this.setData({
       address
     })
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