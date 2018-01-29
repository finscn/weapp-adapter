import { HTMLCanvasElement, CanvasRenderingContext2D, WebGLRenderingContext } from './constructor'
import HTMLElement from './HTMLElement'
import document from './document'

let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false

export default function Canvas() {
  const canvas = wx.createCanvas()

  canvas.type = 'canvas'

  canvas.__proto__.__proto__ = new HTMLElement('canvas')

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

  return canvas
}
