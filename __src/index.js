import * as _window from './window'
import HTMLElement from './HTMLElement'

const global = GameGlobal

function inject () {
  _window.addEventListener = (type, listener) => {
    _window.document.addEventListener(type, listener)
  }
  _window.removeEventListener = (type, listener) => {
    _window.document.removeEventListener(type, listener)
  }

  if (_window.canvas) {
    _window.canvas.addEventListener = _window.addEventListener
    _window.canvas.removeEventListener = _window.removeEventListener
  }

  const { platform } = wx.getSystemInfoSync()

  // 开发者工具无法重定义 window
  if (platform === 'devtools') {
    for (const key in _window) {
      const descriptor = Object.getOwnPropertyDescriptor(global, key)

      if (!descriptor || descriptor.configurable === true) {
        Object.defineProperty(window, key, {
          value: _window[key]
        })
      }
    }

    for (const key in _window.document) {
      const descriptor = Object.getOwnPropertyDescriptor(global.document, key)

      if (!descriptor || descriptor.configurable === true) {
        Object.defineProperty(global.document, key, {
          value: _window.document[key]
        })
      }
    }
    window.parent = window
  } else {
    for (const key in _window) {
      global[key] = _window[key]
    }
    global.window = _window
    window = global
    window.top = window.parent = window
  }
}

if (!GameGlobal.__isAdapterInjected) {
  GameGlobal.__isAdapterInjected = true
  inject()
}
