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
      address:{},
      cart:[],
      allChecked:false,
      totalPrice:0,
      totalNum:0
  },
  onLoad: function (options) { },
  onShow(){
     const address=wx.getStorageSync('address');
     const cart=wx.getStorageSync('cart')||[];
    //  const allChecked=cart.length?cart.every(v=>v.check):false;
     let totalPrice=0;
     let totalNum=0;
     let allChecked=true;
     cart.forEach(v=>{
       if(v.check){
         totalPrice+=v.num*v.goods_price;
         totalNum+=v.num;
       }else{
        allChecked=false;
       }
     })
     allChecked=cart.length!=0?allChecked:false;
     this.setData({
       address,
       cart,
       allChecked,
       totalPrice,
       totalNum
     });
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