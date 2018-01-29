
const localStorage = {
    get length() {
        var _wx$getStorageInfoSyn = wx.getStorageInfoSync(),
            keys = _wx$getStorageInfoSyn.keys

        return keys.length
    },

    key: function(n) {
        var _wx$getStorageInfoSyn2 = wx.getStorageInfoSync(),
            keys = _wx$getStorageInfoSyn2.keys

        return keys[n]
    },
    getItem: function(key) {
        return wx.getStorageSync(key)
    },
    setItem: function(key, value) {
        return wx.setStorageSync(key, value)
    },
    removeItem: function(key) {
        wx.removeStorageSync(key)
    },
    clear: function() {
        wx.clearStorageSync()
    }
};

export default localStorage;
