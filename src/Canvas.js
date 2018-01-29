// import HTMLCanvasElement from './HTMLCanvasElement'

let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false

export default function Canvas() {
  const canvas = wx.createCanvas()

  canvas.type = 'canvas'

  // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

  const _getContext = canvas.getContext

  canvas.getBoundingClientRect = () => {
    const ret = {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
    return ret
  }

  canvas.style = {
    // TODO
  }

  canvas.addEventListener = function (type, listener, options = {}) {
    // TODO
  }

  canvas.removeEventListener = function (type, listener) {
    // TODO
  }
  canvas.dispatchEvent = function (event = {}) {
    // TODO
  }

  return canvas
}
