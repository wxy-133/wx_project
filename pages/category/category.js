// pages/category/category.js
import {request} from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      leftMenuList:[],
      rightMenuList:[],
      currentIndex:0,
      scrollTop:0
  },
 Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates();
    const Cates=wx.getStorageSync('cates');
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
       this.Cates=Cates.data;
       let leftMenuList=this.Cates.map(v=>v.cat_name);
       let rightMenuList=this.Cates[0].children;
       this.setData({
         leftMenuList,
         rightMenuList
       })
      }
    }
  },

  async getCates  () {
    const result=await request({url:'/categories'});
    this.Cates=result.data.message;
    // this.Cates=result;
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightMenuList=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightMenuList
    })
    // request({url:'/categories'})
    // .then(result=>{
    //     this.Cates=result.data.message;
    //     wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    //     let leftMenuList=this.Cates.map(v=>v.cat_name);
    //     let rightMenuList=this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightMenuList
    //     })
    // })
  },
  handleItemTab(e){
   const {index}=e.currentTarget.dataset;
   let rightMenuList=this.Cates[index].children;
   this.setData({
    currentIndex:index,
    rightMenuList,
    scrollTop:0
  })
  }
})