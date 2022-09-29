import { draw, start, update } from "./main.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

onresize = resizeCanvas;
function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

onload = () => {
    resizeCanvas();
    start({ canvas, ctx });
    animate();
}

let dt = 0;
let _time = 0;
let frameCounter = 0;
let FPS = 60;
function animate(time = 0) {
    dt = (time - _time) / 1000;
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update({ canvas, ctx, time, dt });
    draw({ canvas, ctx, time, dt });

    if (frameCounter % FPS == FPS - 1)
        FPS = Math.round(1 / dt);
    ctx.textAlign = "right"
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    ctx.font = "24px Varela"
    ctx.fillText(FPS, canvas.width - 5, 5);
    _time = time;
    frameCounter++;
}
