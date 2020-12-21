// pages/goods_list/goods_list.js
import {
  request
} from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid = options.cid;
    this.getGOodsList();
  },
  async getGOodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    });
    const result = res.data.message;
    const total = result.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages)

    //  console.log(result)
    this.setData({
      goodsList:[...this.data.goodsList,...result.goods]
    })
  },
  handelTabsItemChange(e) {
    // console.log(e)
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx-wx.showToast({
        title: '没有下一页数据',
      })
    }else{
      // console.log('22')
      this.QueryParams.pagenum++;
      this.getGOodsList();
    }
  }
})