// pages/goodes_detail/goods+detail.js
import {request} from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
GoodsInfo:{
   
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },
 async getGoodsDetail(goods_id){
 const res=await request({url: '/goods/detail',data:{goods_id}});
 const goodsObj= res.data.message;
 this.GoodsInfo= res.data.message;
//  console.log(goodsObj)
this.setData({
   goodsObj:{
     goods_name:goodsObj.goods_name,
     goods_price:goodsObj.goods_price,
     //部分手机不识别webp格式
     //后端修改或者临时修改(格式存在)
     goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
     pics:goodsObj.pics
   }
 })
 },
handlePrevImage(e){
   const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
   const current=e.currentTarget.dataset.url;
   wx.previewImage({
     current:current,
     urls: urls,
   })
 },
handleCartAdd(){
   let cart=wx.getStorageSync('cart')||[];
   let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
   if(index===-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.check=true;
      cart.push(this.GoodsInfo);
   }else{
      cart[index].num++;
   }
   wx.setStorageSync('cart', cart)
   wx.showToast({
     title: '加入成功',
     icon:'success',
     mask:true
   })
 }
})