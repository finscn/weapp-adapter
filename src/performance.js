let performance

if (wx.getPerformance) {
    const { platform } = wx.getSystemInfoSync()
    const wxPerf = wx.getPerformance()
    const initTime = wxPerf.now()

    const clientPerfAdapter = Object.assign({}, wxPerf, {
        now: function() {
            return (wxPerf.now() - initTime) / 1000
        }
    })

    performance = platform === 'devtools' ? wxPerf : clientPerfAdapter
} else {
    performance = {
        timeOrigin: Date.now(),
        now: function() {
            return Date.now() - this.timeOrigin
        }
    }
}

export default performance
