import HTMLElement from './HTMLElement'

export default class Body extends HTMLElement {
    constructor() {
        // super('body', 1)
        // 为了性能, 此处不按照标准的DOM层级关系设计.
        // 将body的parent元素直接设置为null
        super('body', 0)
    }
}
