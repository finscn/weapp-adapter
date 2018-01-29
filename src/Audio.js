import * as utils from 'utils.js';
import HTMLAudioElement from 'HTMLAudioElement.js';

const HAVE_NOTHING = 0
const HAVE_METADATA = 1
const HAVE_CURRENT_DATA = 2
const HAVE_FUTURE_DATA = 3
const HAVE_ENOUGH_DATA = 4

const _innerAudioContext = new WeakMap()
const _src = new WeakMap()
const _loop = new WeakMap()
const _autoplay = new WeakMap()

export default class Audio extends HTMLAudioElement
{
    constructor(url){
        super()

        this.HAVE_NOTHING = HAVE_NOTHING
        this.HAVE_METADATA = HAVE_METADATA
        this.HAVE_CURRENT_DATA = HAVE_CURRENT_DATA
        this.HAVE_FUTURE_DATA = HAVE_FUTURE_DATA
        this.HAVE_ENOUGH_DATA = HAVE_ENOUGH_DATA
        this.readyState = HAVE_NOTHING

        _src.set(this, '')

        var innerAudioContext = wx.createInnerAudioContext()

        _innerAudioContext.set(this, innerAudioContext)

        const _this = this

        innerAudioContext.onCanplay(function() {
            _this.dispatchEvent({
                type: 'load'
            })
            _this.dispatchEvent({
                type: 'loadend'
            })
            _this.dispatchEvent({
                type: 'canplay'
            })
            _this.dispatchEvent({
                type: 'canplaythrough'
            })
            _this.dispatchEvent({
                type: 'loadedmetadata'
            })
            _this.readyState = HAVE_CURRENT_DATA
        })
        innerAudioContext.onPlay(function() {
            _this.dispatchEvent({
                type: 'play'
            })
        })
        innerAudioContext.onPause(function() {
            _this.dispatchEvent({
                type: 'pause'
            })
        })
        innerAudioContext.onEnded(function() {
            _this.dispatchEvent({
                type: 'ended'
            })
            _this.readyState = HAVE_ENOUGH_DATA
        })
        innerAudioContext.onError(function() {
            _this.dispatchEvent({
                type: 'error'
            })
        })

        if (url) {
            _innerAudioContext.get(this).src = url
        }
    }

    load() {
        console.warn('HTMLAudioElement.load() is not implemented.')
    }

    play() {
        _innerAudioContext.get(this).play()
    }

    pause() {
        _innerAudioContext.get(this).pause()
    }

    canPlayType() {
        var mediaType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''

        if (typeof mediaType !== 'string') {
            return ''
        }

        if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
            return 'probably'
        }
        return ''
    }

    cloneNode() {
        var newAudio = new Audio()
        newAudio.loop = _innerAudioContext.get(this).loop
        newAudio.autoplay = _innerAudioContext.get(this).loop
        newAudio.src = this.src
        return newAudio
    }

    get currentTime() {
        return _innerAudioContext.get(this).currentTime
    }

    set currentTime(value) {
        _innerAudioContext.get(this).seek(value)
    }

    get src() {
        return _src.get(this)
    }

    set src(value) {
        _src.set(this, value)
        _innerAudioContext.get(this).src = value
    }

    get loop() {
        return _innerAudioContext.get(this).loop
    }

    set loop(value) {
        _innerAudioContext.get(this).loop = value
    }

    get autoplay() {
        return _innerAudioContext.get(this).autoplay
    }

    set autoplay(value) {
        _innerAudioContext.get(this).autoplay = value
    }

    get paused() {
        return _innerAudioContext.get(this).paused
    }
};

