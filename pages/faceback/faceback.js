// pages/faceback/faceback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "体验问题",
      isActive: true
    },
    {
      id: 1,
      value: "商品商、家反馈",
      isActive: false
    }
  ],
  chooseImgs:[],
  textVal:'',

},
UpLoadImags:[],
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
handleChooseImg(){
  wx.chooseImage({
    count: 9,
    sizeType:['original','compressed'],
    sourceType:['album','camera'],
    success:(result=>{
      this.setData({
        chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
      })
    })
  })
},
handleRemoveImg(e){
  const {index}=e.currentTarget.dataset;
  let {chooseImgs}=this.data;
  chooseImgs.splice(index,1);
  this.setData({ 
    chooseImgs
  })
},
handleTextInput(e){
  this.setData({
    textVal:e.detail.value
  })
},
handleFormSubmit(){
  const {textVal,chooseImgs}=this.data;
  if(!textVal.trim){
    wx.showToast({
      title: '输入不正确',
      mask:true
    });
    return;
  }
  wx.showLoading({
    title: '正在等待中',
    mask:true
  })
  if(chooseImgs.length!=0){
  chooseImgs.forEach((v,i)=>{
    wx.uploadFile({
      filePath: 'v',
      name: 'file',
      url: 'https://images.ac.cn//Home/Index/UploadAction/',
      success:(result)=>{
        // console.log(result)
        let url =JSON.parse(result.data).url;
        this.UpLoadImags.push(url);
        if(i===chooseImgs.length-1){
          wx.hideLoading();
          console.log('222')
          this.setData({
            textVal:'',
            chooseImgs:[]
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  })
}else{
  wx.hideLoading();
  wx.navigateBack({
    delta: 1,
  })
  console.log('222')
}
}
})