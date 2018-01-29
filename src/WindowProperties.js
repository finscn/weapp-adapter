const { screenWidth, screenHeight, devicePixelRatio } = wx.getSystemInfoSync()

export const innerWidth = screenWidth
export const innerHeight = screenHeight
export { devicePixelRatio }
export const screen = {
  availWidth: innerWidth,
  availHeight: innerHeight
}
export const performance = wx.getPerformance()
export const ontouchstart = null
export const ontouchmove = null
export const ontouchend = null
