import HTMLAudioElement from './HTMLAudioElement'

const HAVE_NOTHING = 0
const HAVE_METADATA = 1
const HAVE_CURRENT_DATA = 2
const HAVE_FUTURE_DATA = 3
const HAVE_ENOUGH_DATA = 4

let SN_SEED = 1

const _innerAudioContext = {}

export default class Audio extends HTMLAudioElement {

    constructor(url) {
        super()

        this._$sn = SN_SEED++

        this.HAVE_NOTHING = HAVE_NOTHING
        this.HAVE_METADATA = HAVE_METADATA
        this.HAVE_CURRENT_DATA = HAVE_CURRENT_DATA
        this.HAVE_FUTURE_DATA = HAVE_FUTURE_DATA
        this.HAVE_ENOUGH_DATA = HAVE_ENOUGH_DATA

        this.readyState = this.HAVE_NOTHING

        const innerAudioContext = wx.createInnerAudioContext()

        _innerAudioContext[this._$sn] = innerAudioContext

        this._canplayEvents = [
            'load',
            'loadend',
            'canplay',
            'canplaythrough',
            'loadedmetadata'
        ]

        innerAudioContext.onCanplay(() => {
            this._loaded = true
            this.readyState = this.HAVE_CURRENT_DATA
            this._canplayEvents.forEach((type) => {
                this.dispatchEvent({ type: type })
            })
        })
        innerAudioContext.onPlay(() => {
            this.dispatchEvent({ type: 'play' })
        })
        innerAudioContext.onPause(() => {
            this.dispatchEvent({ type: 'pause' })
        })
        innerAudioContext.onEnded(() => {
            this.dispatchEvent({ type: 'ended' })
            this.readyState = HAVE_ENOUGH_DATA
        })
        innerAudioContext.onError(() => {
            this.dispatchEvent({ type: 'error' })
        })

        if (url) {
            this.src = url
        } else {
            this._src = ''
        }

        this._loop = innerAudioContext.loop
        this._autoplay = innerAudioContext.autoplay
        this._volume = innerAudioContext.volume
        this._muted = false
    }

    load() {
        // console.warn('HTMLAudioElement.load() is not implemented.')
        // weixin doesn't need call load() manually
    }

    play() {
        _innerAudioContext[this._$sn].play()
    }

    pause() {
        _innerAudioContext[this._$sn].pause()
    }

    destroy() {
        _innerAudioContext[this._$sn].destroy()
    }

    canPlayType(mediaType = '') {
        if (typeof mediaType !== 'string') {
            return ''
        }

        if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
            return 'probably'
        }
        return ''
    }

    get currentTime() {
        return _innerAudioContext[this._$sn].currentTime
    }

    set currentTime(value) {
        _innerAudioContext[this._$sn].seek(value)
    }

    get duration() {
        return _innerAudioContext[this._$sn].duration
    }

    get src() {
        return this._src
    }

    set src(value) {
        this._src = value
        this._loaded = false
        this.readyState = this.HAVE_NOTHING

        const innerAudioContext = _innerAudioContext[this._$sn]

        innerAudioContext.src = value
    }

    _afterAddEventListener(type, listener, options, events) {
        type = String(type).toLowerCase()

        if (this._loaded && this._canplayEvents.indexOf(type) !== -1) {
            this.dispatchEvent({ type: type })
        }
    }

    get loop() {
        return this._loop
    }

    set loop(value) {
        this._loop = value
        _innerAudioContext[this._$sn].loop = value
    }

    get autoplay() {
        return this._autoplay
    }

    set autoplay(value) {
        this._autoplay = value
        _innerAudioContext[this._$sn].autoplay = value
    }

    get paused() {
        return _innerAudioContext[this._$sn].paused
    }

    get volume() {
        return this._volume
    }

    set volume(value) {
        this._volume = value
        if (!this._muted) {
            _innerAudioContext[this._$sn].volume = value
        }
    }

    get muted() {
        return this._muted
    }

    set muted(value) {
        this._muted = value
        if (value) {
            _innerAudioContext[this._$sn].volume = 0
        } else {
            _innerAudioContext[this._$sn].volume = this._volume
        }
    }

    cloneNode() {
        const newAudio = new Audio()
        newAudio.loop = this.loop
        newAudio.autoplay = this.autoplay
        newAudio.src = this.src
        return newAudio
    }
}
