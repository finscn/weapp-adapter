const _socketTask = new WeakMap()

export default class WebSocket
{
    constructor(url, protocols = []){
        this.binaryType = ''
        this.bufferedAmount = 0
        this.extensions = ''
        this.onclose = null
        this.onerror = null
        this.onmessage = null
        this.onopen = null
        this.protocol = ''
        this.readyState = 3

        if (typeof url !== 'string' || !/(^ws:\/\/)|(^wss:\/\/)/.test(url)) {
            throw new TypeError('Failed to construct \'WebSocket\': The URL \'' + url + '\' is invalid')
        }

        this.url = url
        this.readyState = WebSocket.CONNECTING

        const socketTask = wx.connectSocket({
            url: url,
            protocols: Array.isArray(protocols) ? protocols : [protocols]
        })

        _socketTask.set(this, socketTask)

        socketTask.onClose(function(res) {
            _this.readyState = WebSocket.CLOSED
            if (typeof _this.onclose === 'function') {
                _this.onclose(res)
            }
        })

        socketTask.onMessage(function(res) {
            if (typeof _this.onmessage === 'function') {
                _this.onmessage(res)
            }
        })

        socketTask.onOpen(function() {
            _this.readyState = WebSocket.OPEN
            if (typeof _this.onopen === 'function') {
                _this.onopen()
            }
        })

        socketTask.onError(function(res) {
            if (typeof _this.onerror === 'function') {
                _this.onerror(new Error(res.errMsg))
            }
        })

        // TODO 小程序内目前获取不到error信息，实际上需要根据服务器选择的 sub-protocol 返回

        // TODO 更新 bufferedAmount
        // The connection is closed or couldn't be opened.
        // The connection is open and ready to communicate.
    }

    close(code, reason){
        this.readyState = WebSocket.CLOSING
        const socketTask = _socketTask.get(this)

        socketTask.close({
            code: code,
            reason: reason
        })
    }

    send(){
        if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
            throw new TypeError('Failed to send message: The data ' + data + ' is invalid')
        }

        const socketTask = _socketTask.get(this)

        socketTask.send({
            data: data
        })
    }
};

WebSocket.CONNECTING = 0
WebSocket.OPEN = 1
WebSocket.CLOSING = 2
WebSocket.CLOSED = 3

