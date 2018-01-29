import * as utils from 'utils.js';
// import * as window from 'window.js';
// import * as document from 'document.js';

export default class TouchEvent
{
    constructor(){
        this.target = window.canvas
        this.currentTarget = window.canvas
        this.touches = []
        this.targetTouches = []
        this.changedTouches = []
        this.preventDefault = utils.noop
        this.stopPropagation = utils.noop

        this.type = type
    }
};

function touchEventHandlerFactory(type) {
    return function(event) {
        var touchEvent = new TouchEvent(type)
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
