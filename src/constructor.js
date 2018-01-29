import HTMLElement from './HTMLElement'

export class HTMLImageElement extends HTMLElement {
  constructor() {
    super('img')
  }
}

export class HTMLCanvasElement extends HTMLElement {
  constructor() {
    super('canvas')
  }
}
