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

function animate(time = 0) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update({ time, canvas, ctx });
    draw({ time, canvas, ctx });
}

