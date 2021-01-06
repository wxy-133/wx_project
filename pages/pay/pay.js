// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showToast
} from '../../utils/asncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address:{},
      cart:[],
      allChecked:false,
      totalPrice:0,
      totalNum:0
  },
  onLoad: function (options) { },
  onShow(){
     const address=wx.getStorageSync('address');
     let cart=wx.getStorageSync('cart')||[];
     cart=cart.filter(v=>v.check);
    this.setData({
      address
    });
    let totalPrice=0;
    let totalNum=0;
    let allChecked=true;
    cart.forEach(v=>{
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
    wx.setStorageSync("cart", cart);
  }

})