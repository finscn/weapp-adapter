import * as window from '../window'
import document from '../document'
import { noop } from '../util/'

export default class TouchEvent {
  target = window.canvas
  currentTarget = window.canvas
  touches = []
  targetTouches = []
  changedTouches = []
  preventDefault = noop
  stopPropagation = noop
  constructor(type) {
    this.type = type
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
