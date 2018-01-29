// import * as window from '../window'
// import document from '../document'
import { noop } from '../util/index.js'

export default class TouchEvent {
  constructor(type) {
    this.type = type
    this.target = window.canvas
    this.currentTarget = window.canvas
    this.touches = []
    this.targetTouches = []
    this.changedTouches = []
    this.preventDefault = noop
    this.stopPropagation = noop
  }
}

function touchEventHandlerFactory(type) {
  return (event) => {
    const touchEvent = new TouchEvent(type)

    touchEvent.touches = event.touches
    touchEvent.targetTouches = Array.prototype.slice.call(event.touches)
    touchEvent.changedTouches = event.changedTouches
    touchEvent.timeStamp = event.timeStamp
    document.dispatchEvent(touchEvent)
  }
}

wx.onTouchStart(touchEventHandlerFactory('touchstart'))
wx.onTouchMove(touchEventHandlerFactory('touchmove'))
wx.onTouchEnd(touchEventHandlerFactory('touchend'))
wx.onTouchCancel(touchEventHandlerFactory('touchcancel'))
