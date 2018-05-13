import './webapp-adapter/index.js'
import './my-game.js'


try {
    window.PointerEvent = null;
} catch (e) {
    console.log("Can't remove PointerEvent");
}

try {
    window.performance = null;
} catch (e) {
    console.log("Can't remove window.performance");
}

setTimeout(function() {
    if (window.start) {
        window.start();
    }
}, 10);
