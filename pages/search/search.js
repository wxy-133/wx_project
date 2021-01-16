// pages/search/search.js
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inputValue:""
  },
  TimeId:-1,
  handleInput(e) {
    const {value} = e.detail;
    if (!value.trim()) {
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    }),
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value)
    },1000)
  },
  async qsearch(query) {
    const result=await request({url:"/goods/qsearch",data:{query}});
    const res=result.data.message;
    // console.log(res)
    this.setData({
      goods:res
    })
  },
  handleCancel(){
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
    })
  }
})