import * as utils from 'utils.js';
import Element from 'Element.js';

export default class HTMLElement extends Element
{
    constructor(tagName = ''){
        super();

        this.style = {
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px'
        };
        this.insertBefore = utils.noop;
        this.innerHTML = '';
        this.outerHTML = '';

        this.tagName = tagName.toUpperCase();
    }

    setAttribute(name, value){
        this[name] = value;
    }

    getAttribute(name){
        return this[name];
    }

    getBoundingClientRect(){
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    focus(){

    }

    get clientWidth(){
        const ret = parseInt(this.style.fontSize, 10) * this.innerHTML.length;

        return Number.isNaN(ret) ? 0 : ret;
    }

    get clientHeight(){
        const ret = parseInt(this.style.fontSize, 10);

        return Number.isNaN(ret) ? 0 : ret;
    }
};
