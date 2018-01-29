// import * as _utils from 'utils.js';
import HTMLElement from 'HTMLElement.js';
import HTMLImageElement from 'HTMLImageElement.js';
import HTMLCanvasElement from 'HTMLCanvasElement.js';
import HTMLMediaElement from 'HTMLMediaElement.js';
import HTMLAudioElement from 'HTMLAudioElement.js';
import HTMLVideoElement from 'HTMLVideoElement.js';

import TouchEvent from 'TouchEvent.js';
import FileReader from 'FileReader.js';
import WebSocket from 'WebSocket.js';
import Worker from 'Worker.js';
import XMLHttpRequest from 'XMLHttpRequest.js';
import Audio from 'Audio.js';
import Image from 'Image.js';
import Canvas from 'Canvas.js';

import localStorage from 'localStorage.js';

const _wx$getSystemInfoSync = wx.getSystemInfoSync();
const screenWidth = _wx$getSystemInfoSync.screenWidth;
const screenHeight = _wx$getSystemInfoSync.screenHeight;
const platform = _wx$getSystemInfoSync.platform;

export const devicePixelRatio = _wx$getSystemInfoSync.devicePixelRatio;

export const innerWidth = screenWidth;
export const innerHeight = screenHeight;

export const screen = {
    width: screenWidth,
    height: screenHeight,
    availWidth: innerWidth,
    availHeight: innerHeight,
    availLeft: 0,
    availTop: 0,
};

export const performance = {
    now: function(){
        return Date.now() / 1000;
    }
};

export const navigator = {
    platform: platform,
    language: 'zh-cn',

    // TODO 根据设备信息生成不同的appVersion 和 userAgent
    appVersion: '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/zh_CN',

    onLine: true, // TODO 用 wx.getNetworkStateChange 和 wx.onNetworkStateChange 来返回真实的状态

    // TODO 用 wx.getLocation 来封装 geolocation
    geolocation: {
        // getCurrentPosition: _utils.noop,
        // watchPosition: _utils.noop,
        // clearWatch: _utils.noop
    }
};

export const location = {
    href: 'game.js',
    reload: function(){
        // nothing to do
    }
};

// export const setTimeout = setTimeout;
// export const setInterval = setInterval;
// export const clearTimeout = clearTimeout;
// export const clearInterval = clearInterval;
// export const requestAnimationFrame = requestAnimationFrame;
// export const cancelAnimationFrame = cancelAnimationFrame;

export const ontouchstart = null;
export const ontouchmove = null;
export const ontouchend = null;

// export const HTMLElement = HTMLElement;
// export const TouchEvent = TouchEvent;
// export const FileReader = FileReader;
// export const WebSocket = WebSocket;
// export const XMLHttpRequest = XMLHttpRequest;
// export const Audio = Audio;
// export const Image = Image;
GameGlobal.screencanvas = new Canvas();
export const canvas = GameGlobal.screencanvas;

export {
    setTimeout,
    setInterval,
    clearTimeout,
    clearInterval,
    requestAnimationFrame,
    cancelAnimationFrame,

    localStorage,
    HTMLElement,
    HTMLImageElement,
    HTMLCanvasElement,
    HTMLMediaElement,
    HTMLAudioElement,
    HTMLVideoElement,
    TouchEvent,
    FileReader,
    WebSocket,
    Worker,
    XMLHttpRequest,
    Audio,
    Image
};


