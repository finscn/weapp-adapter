// import "../src/index.js"

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

window._onload = function() {
    // console.log(HTMLElement, HTMLAudioElement, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement);
    console.log('==== test instanceof ====')
    var audio = new Audio();
    console.log('Audio', audio instanceof HTMLAudioElement, audio instanceof HTMLElement);
    var image = new Image();
    console.log('Image', image instanceof HTMLImageElement, image instanceof HTMLElement);
    var canvas = document.createElement('canvas');
    console.log('Canvas', canvas instanceof HTMLCanvasElement, canvas instanceof HTMLElement);
    var video = document.createElement('video');
    console.log('Video', video instanceof HTMLVideoElement, video instanceof HTMLElement);

    console.log('Started.');
}

