import * as utils from 'utils.js';
import HTMLElement from 'HTMLElement.js';

export default class HTMLMediaElement extends HTMLElement
{
    constructor(type){
        super();
        this.type = type;
    }

    addTextTrack(){}

    captureStream(){}

    fastSeek(){}

    load(){}

    pause(){}

    play(){}

};
