import Canvas from './Canvas'

export navigator from './navigator'
export XMLHttpRequest from './XMLHttpRequest'
export WebSocket from './WebSocket'
export Image from './Image'
export Audio from './Audio'
export FileReader from './FileReader'
export HTMLElement from './HTMLElement'
export HTMLImageElement from './HTMLImageElement'
export HTMLCanvasElement from './HTMLCanvasElement'
export HTMLMediaElement from './HTMLMediaElement'
export HTMLAudioElement from './HTMLAudioElement'
export HTMLVideoElement from './HTMLVideoElement'
export { TouchEvent } from './EventIniter/index.js'
export localStorage from './localStorage'
export location from './location'
export * from './WindowProperties'

// 暴露全局的 canvas
const canvas = new Canvas()

export { canvas }
export { setTimeout }
export { setInterval }
export { clearTimeout }
export { clearInterval }
export { requestAnimationFrame }
export { cancelAnimationFrame }
