import HTMLCanvasElement from 'HTMLCanvasElement.js'

// TODO
let hasModifiedCanvasPrototype = false;
let hasInit2DContextConstructor = false;
let hasInitWebGLContextConstructor = false;

export default function() {
    var canvas = wx.createCanvas();

    canvas.type = 'canvas';

    canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement();

    var _getContext = canvas.getContext;

    canvas.getBoundingClientRect = function() {
        var ret = {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        }
        return ret;
    }

    return canvas;
};
