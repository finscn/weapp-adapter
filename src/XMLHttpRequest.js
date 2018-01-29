const _url = new WeakMap()
const _method = new WeakMap()
const _requestHeader = new WeakMap()
const _responseHeader = new WeakMap()
const _requestTask = new WeakMap()

function _triggerEvent(type) {
    if (typeof this['on' + type] === 'function') {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key]
        }

        this['on' + type].apply(this, args)
    }
}

function _changeReadyState(readyState) {
    this.readyState = readyState
    _triggerEvent.call(this, 'readystatechange')
}

export default class XMLHttpRequest
{
    constructor(){
        this.onabort = null
        this.onerror = null
        this.onload = null
        this.onloadstart = null
        this.onprogress = null
        this.ontimeout = null
        this.onloadend = null
        this.onreadystatechange = null
        this.readyState = 0
        this.response = null
        this.responseText = null
        this.responseType = ''
        this.responseXML = null
        this.status = 0
        this.statusText = ''
        this.upload = {}
        this.withCredentials = false

        _requestHeader.set(this, {
            'content-type': 'application/x-www-form-urlencoded'
        })
        _responseHeader.set(this, {})
    }

    /*
     * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
     */

    abort(){
        var myRequestTask = _requestTask.get(this)

        if (myRequestTask) {
            myRequestTask.abort()
        }
    }

    getAllResponseHeaders(){
        var responseHeader = _responseHeader.get(this)

        return Object.keys(responseHeader).map(function(header) {
            return header + ': ' + responseHeader[header]
        }).join('\n')
    }

    getResponseHeader(header){
        return _responseHeader.get(this)[header]
    }

    open(method, url /* async, user, password 这几个参数在小程序内不支持*/ ){
        _method.set(this, method)
        _url.set(this, url)
        _changeReadyState.call(this, XMLHttpRequest.OPENED)
    }

    overrideMimeType(){

    }

    send(data = ''){
        if (this.readyState !== XMLHttpRequest.OPENED) {
            throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.")
        } else {
            wx.request({
                data: data,
                url: _url.get(this),
                method: _method.get(this),
                header: _requestHeader.get(this),
                responseType: this.responseType,
                success: function success(_ref) {
                    var data = _ref.data,
                        statusCode = _ref.statusCode,
                        header = _ref.header

                    if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
                        try {
                            data = JSON.stringify(data)
                        } catch (e) {
                            data = data
                        }
                    }

                    _this.status = statusCode
                    _responseHeader.set(_this, header)
                    _triggerEvent.call(_this, 'loadstart')
                    _changeReadyState.call(_this, XMLHttpRequest.HEADERS_RECEIVED)
                    _changeReadyState.call(_this, XMLHttpRequest.LOADING)

                    _this.response = data

                    if (data instanceof ArrayBuffer) {
                        _this.responseText = ''
                        var bytes = new Uint8Array(data)
                        var len = bytes.byteLength

                        for (var i = 0; i < len; i++) {
                            _this.responseText += String.fromCharCode(bytes[i])
                        }
                    } else {
                        _this.responseText = data
                    }
                    _changeReadyState.call(_this, XMLHttpRequest.DONE)
                    _triggerEvent.call(_this, 'load')
                    _triggerEvent.call(_this, 'loadend')
                },
                fail: function fail(_ref2) {
                    var errMsg = _ref2.errMsg

                    // TODO 规范错误
                    if (errMsg.indexOf('abort') !== -1) {
                        _triggerEvent.call(_this, 'abort')
                    } else {
                        _triggerEvent.call(_this, 'error', errMsg)
                    }
                    _triggerEvent.call(_this, 'loadend')
                }
            })
        }
    }

    setRequestHeader(header, value){
        const myHeader = _requestHeader.get(this)

        myHeader[header] = value
        _requestHeader.set(this, myHeader)
    }

    addEventListener(type, listener){
        if (typeof listener === 'function') {
            let event = { target: this }
            let that = this
            this['on' + type] = function () {
                listener.call(that, event)
            }
        }
    }
};

XMLHttpRequest.UNSEND = 0
XMLHttpRequest.OPENED = 1
XMLHttpRequest.HEADERS_RECEIVED = 2
XMLHttpRequest.LOADING = 3
XMLHttpRequest.DONE = 4
