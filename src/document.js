import * as utils from 'utils.js';
import * as window from 'window.js';
import HTMLElement from 'HTMLElement.js';
import HTMLVideoElement from 'HTMLVideoElement.js';
import Canvas from 'Canvas.js';
import Image from 'Image.js';
import Audio from 'Audio.js';

const events = {};

const document = {
    readyState: 'complete',
    visibilityState: 'visible',
    documentElement: window,
    hidden: false,
    style: {},
    location: window.location,
    ontouchstart: null,
    ontouchmove: null,
    ontouchend: null,

    head: new HTMLElement('head'),
    body: new HTMLElement('body'),

    createElement: function(tagName) {
        if (tagName === 'img') {
            return new Image();
        } else if (tagName === 'canvas') {
            return new Canvas();
        } else if (tagName === 'audio') {
            return new Audio();
        } else if (tagName === 'video') {
            return new HTMLVideoElement();
        }

        return new HTMLElement(tagName);
    },
    createElementNS: function(nameSpace, tagName) {
        return this.createElement(tagName);
    },
    getElementById: function(id) {
        if (id === window.canvas.id) {
            return window.canvas;
        }
        return null;
    },
    getElementsByTagName: function(tagName) {
        if (tagName === 'head') {
            return [document.head]
        } else if (tagName === 'body') {
            return [document.body]
        } else if (tagName === 'canvas') {
            return [window.canvas]
        }
        return []
    },
    querySelector: function(query) {
        if (query === 'head') {
            return document.head
        } else if (query === 'body') {
            return document.body
        } else if (query === 'canvas') {
            return window.canvas
        } else if (query === '#' + window.canvas.id) {
            return window.canvas
        }
        return null
    },
    querySelectorAll: function(query) {
        if (query === 'head') {
            return [document.head]
        } else if (query === 'body') {
            return [document.body]
        } else if (query === 'canvas') {
            return [window.canvas]
        }
        return []
    },
    addEventListener: function addEventListener(type, listener) {
        if (!events[type]) {
            events[type] = []
        }
        events[type].push(listener)
    },
    removeEventListener: function removeEventListener(type, listener) {
        var listeners = events[type]

        if (listeners && listeners.length > 0) {
            for (var i = listeners.length; i--; i > 0) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1)
                    break
                }
            }
        }
    },
    dispatchEvent: function dispatchEvent(event) {
        var listeners = events[event.type]

        if (listeners) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](event)
            }
        }
    }
};

export default document;

