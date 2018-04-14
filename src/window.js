import Canvas from './Canvas'

import CommonComputedStyle from './style/CommonComputedStyle'
import getImageComputedStyle from './style/ImageComputedStyle'
import getCanvasComputedStyle from './style/CanvasComputedStyle'

export navigator from './navigator'
export XMLHttpRequest from './XMLHttpRequest'
export WebSocket from './WebSocket'
export Image from './Image'
export ImageBitmap from './ImageBitmap'
export Audio from './Audio'
export FileReader from './FileReader'
export HTMLElement from './HTMLElement'
export HTMLImageElement from './HTMLImageElement'
export HTMLCanvasElement from './HTMLCanvasElement'
export HTMLMediaElement from './HTMLMediaElement'
export HTMLAudioElement from './HTMLAudioElement'
export HTMLVideoElement from './HTMLVideoElement'
export WebGLRenderingContext from './WebGLRenderingContext'
export { TouchEvent, PointerEvent, MouseEvent } from './EventIniter/index.js'
export localStorage from './localStorage'
export location from './location'
export * from './WindowProperties'

// 暴露全局的 canvas
GameGlobal.screencanvas = GameGlobal.screencanvas || new Canvas()
const canvas = GameGlobal.screencanvas;

function getComputedStyle(dom) {
    const tagName = dom.tagName;

    if (tagName === "CANVAS") {
        return getCanvasComputedStyle(dom);
    } else if (tagName === "IMG") {
        return getImageComputedStyle(dom);
    }

    return CommonComputedStyle;
}

export { canvas }
export { setTimeout }
export { setInterval }
export { clearTimeout }
export { clearInterval }
export { requestAnimationFrame }
export { cancelAnimationFrame }
export { getComputedStyle }
