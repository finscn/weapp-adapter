// import HTMLCanvasElement from './HTMLCanvasElement'
import { innerWidth, innerHeight } from './WindowProperties'

// TODO
let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false

export default function Canvas() {
    const canvas = wx.createCanvas()

    const _getContext = canvas.getContext;

    canvas.type = 'canvas'

    // canvas.tagName = 'CANVAS'
    // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

    if (!('parentElement' in canvas)) {
        Object.defineProperty(canvas, 'parentElement', {
            enumerable: true,
            get: function get() {
                return document.body
            }
        })
    }
    if (!('parentNode' in canvas)) {
        Object.defineProperty(canvas, 'parentNode', {
            enumerable: true,
            get: function get() {
                return document.body
            }
        })
    }

    canvas.style = {
        top: '0px',
        left: '0px',
        width: innerWidth + 'px',
        height: innerHeight + 'px',
        margin: '0px',
    }

    canvas.getBoundingClientRect = () => {
        const ret = {
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        }
        ret.right = ret.width;
        ret.bottom = ret.height;

        return ret
    }

    canvas.focus = function() {};
    canvas.blur = function() {};

    canvas.addEventListener = function(type, listener, options = {}) {
        // console.log('canvas.addEventListener', type);
        document.addEventListener(type, listener, options);
    }

    canvas.removeEventListener = function(type, listener) {
        // console.log('canvas.removeEventListener', type);
        document.removeEventListener(type, listener);
    }

    canvas.dispatchEvent = function(event = {}) {
        console.log('canvas.dispatchEvent', event.type, event);
        // nothing to do
    }

    if (!('clientLeft' in canvas)){
        canvas.clientLeft = 0;
        canvas.clientTop = 0;
    }
    if (!('offsetLeft' in canvas)){
        canvas.offsetLeft = 0;
        canvas.offsetTop = 0;
    }
    if (!('scrollLeft' in canvas)){
        canvas.scrollLeft = 0;
        canvas.scrollTop = 0;
    }

    Object.defineProperty(canvas, 'clientWidth', {
        enumerable: true,
        get: function get() {
            return innerWidth
        }
    })

    Object.defineProperty(canvas, 'clientHeight', {
        enumerable: true,
        get: function get() {
            return innerHeight
        }
    })

    Object.defineProperty(canvas, 'offsetWidth', {
        enumerable: true,
        get: function get() {
            return innerWidth
        }
    })

    Object.defineProperty(canvas, 'offsetHeight', {
        enumerable: true,
        get: function get() {
            return innerHeight
        }
    })

    return canvas
}
