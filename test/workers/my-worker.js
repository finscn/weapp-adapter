var count = 0;

worker.onMessage(function(res) {
    console.log("res from main", res, Date.now());

    worker.postMessage({
        "xyz": count++,
    });
});
