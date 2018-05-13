window.start = function() {
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

    init()
}



// var app;

var width = width || window.innerWidth;
var height = height || window.innerHeight;
var pixelRatio = pixelRatio || window.devicePixelRatio;

console.log('window size: ', width, height);
console.log('devicePixelRatio: ', pixelRatio);


// /////////////////////////////////////////
// /////////////////////////////////////////
// /////////////////////////////////////////
// /////////////////////////////////////////
// /////////////////////////////////////////


var WIDTH = width;
var HEIGHT = height;

var context;

var worker;

function init() {

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    canvas.style.backgroundColor = "#ffffff";
    context = canvas.getContext('2d');

    initWorker();
    tick();
}



function tick() {
    render(context);
    requestAnimationFrame(tick);
}


var data;
var count = 0;

function initWorker() {

    worker = new Worker('workers/my-worker.js');

    // worker = wx.createWorker('workers/my-worker.js');

    console.log('worker', !!worker, worker === undefined);

    worker.onmessage = function(event) {
        data = event.data;

        console.log("event.data from worker", data);
    };

    var countUp = function() {
        worker.postMessage({
            "abc": count++,
        });
    };
    countUp();
    setInterval(countUp, 1000 * 5);

}

function render(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = '#000000';

    if (data) {
        ctx.font = '40px';
        ctx.strokeText("From worker : " + JSON.stringify(data), 100, 100);
    }
}
