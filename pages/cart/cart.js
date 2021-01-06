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
     const cart=wx.getStorageSync('cart')||[];
    //  const allChecked=cart.length?cart.every(v=>v.check):false;
    this.setData({
      address
    });
    this.setCart(cart);
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
  },
  handleItemChange(e){
   const goods_id=e.currentTarget.dataset.id;
  //  console.log(goods_id)
  let {cart}=this.data;
  let index=cart.findIndex(v=>v.goods_id===goods_id);
  cart[index].check=!cart[index].check;
  this.setCart(cart);
  },
  //设置购物车状态，重新计算底部工具栏数据
  setCart(cart){
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
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  handleItemAllCheck(){
    let {cart,allChecked}=this.data;
    allChecked=!allChecked;
    cart.forEach(v=>v.check=allChecked);
    this.setCart(cart);
  },
  handleItemNumEdit(e){
    const {operation,id}=e.currentTarget.dataset;
    // console.log(operation)
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    cart[index].num+=operation;
    this.setCart(cart);
  },
   async handlePlay(){
    const {address,totalNum}=this.data;
    if(!address.userName){
     await showToast({title:'您还没有选择收货地址'})
      return;
    }
    if(totalNum===0){
      await showToast({title:'您还没有选择商品'})
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }
})