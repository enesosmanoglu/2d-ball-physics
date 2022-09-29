export class Mouse {
    static x;
    static y;
    static downx;
    static downy;
    static upx;
    static upy;
    static isdown;
    static events = {
        down: [],
        move: [],
        up: [],
    };
    static addDownListener(fn) {
        this.events.down.push(fn);
    }
    static addMoveListener(fn) {
        this.events.move.push(fn);
    }
    static addUpListener(fn) {
        this.events.up.push(fn);
    }
}

function mousedown({ x, y }) {
    requestFullScreen.call(docEl);
    // console.log("mousedown", x, y);
    Mouse.isdown = true;
    Mouse.x = x;
    Mouse.y = y;
    Mouse.downx = x;
    Mouse.downy = y;
    for (const event of Mouse.events.down) {
        event({ x, y });
    }
}
function mousemove({ x, y }) {
    Mouse.x = x;
    Mouse.y = y;
    for (const event of Mouse.events.move) {
        event({ x, y });
    }
}
function mouseup({ x, y }) {
    // console.log("mouseup", x, y);
    Mouse.isdown = false;
    Mouse.upx = x;
    Mouse.upy = y;
    for (const event of Mouse.events.up) {
        event({ x, y });
    }
}

addEventListener("mousedown", e => {
    e.preventDefault();
    let { x, y } = e;
    mousedown({ x, y });
});
addEventListener("mousemove", e => {
    e.preventDefault();
    let { x, y } = e;
    mousemove({ x, y });
});
addEventListener("mouseup", e => {
    e.preventDefault();
    let { x, y } = e;
    mouseup({ x, y });
});

addEventListener("touchstart", e => {
    let touch = e.changedTouches[0];
    mousedown({
        x: touch.clientX,
        y: touch.clientY,
    });
});
addEventListener("touchend", e => {
    let touch = e.changedTouches[0];
    mouseup({
        x: touch.clientX,
        y: touch.clientY,
    });
});


var doc = window.document;
var docEl = doc.documentElement;
var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

function toggleFullScreen() {
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)
        requestFullScreen.call(docEl);
    else
        cancelFullScreen.call(doc);
}