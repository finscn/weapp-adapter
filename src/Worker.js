export default class Worker {

    onmessage = null

    constructor(file) {

        this._file = file;

        this._worker = wx.createWorker(file);

        this._worker.onMessage((res) => {
            if (this.onmessage) {
                this.onmessage({
                    target: this,
                    data: res,
                });
            }
        });

    }

    postMessage(message, transferList) {
        this._worker.postMessage(message, transferList);
    }
}

// export default function(file) {
//     const worker = wx.createWorker(file);

//     return worker;
// };
