import HTMLElement from './HTMLElement'
import { innerWidth, innerHeight } from './WindowProperties'

export default class Body extends HTMLElement {
    constructor(type) {
        super('body')

        if (!('clientLeft' in this)) {
            this.clientLeft = 0;
            this.clientTop = 0;
        }
        if (!('clientWidth' in this)) {
            this.clientWidth = innerWidth;
            this.clientHeight = innerHeight;
        }

        if (!('offsetLeft' in this)) {
            this.offsetLeft = 0;
            this.offsetTop = 0;
        }
        if (!('offsetWidth' in this)) {
            this.offsetWidth = innerWidth;
            this.offsetHeight = innerHeight;
        }

        if (!('scrollLeft' in this)) {
            this.scrollLeft = 0;
            this.scrollTop = 0;
        }
        if (!('scrollWidth' in this)) {
            this.scrollWidth = innerWidth;
            this.scrollHeight = innerHeight;
        }

        this.style = {
            top: '0px',
            left: '0px',
            width: innerWidth + 'px',
            height: innerHeight + 'px',
            padding: '0px',
            margin: '0px',
        }
    }

    getBoundingClientRect() {
        const ret = {
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        }
        ret.right = ret.width;
        ret.bottom = ret.height;

        return ret
    }

    focus() {

    }

    blur() {

    }

    get parentElement() {
        return window.document
    }
}
