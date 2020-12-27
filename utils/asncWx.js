//promise 形式的getsetting
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: () => {
        reject(err);
      }
    })
  })
}
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: () => {
        reject(err);
      }
    })
  })
}
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: () => {
        reject(err);
      }
    })
  })
}
// async handleChooseAddress() {
//   const res1 = await getSetting();
//   const scopeAddress = res1.authSetting["scope.address"];
//   if (scopeAddress === true || scopeAddress === undefined) {
//     const res2 = await chooseAddress();
//   } else {
//     await openSetting();
//     const res2 = await chooseAddress();
//   }
// }