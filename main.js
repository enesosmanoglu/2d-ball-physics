let player = {
    x: 0,
    y: 0,
    radius: 20,
    vx: 0,
    vy: -8,
    gravity: 0.1,
    bounciness: 0.3,
    friction: 0.02,
}
let mouse = {
    x: undefined,
    y: undefined,
    downx: undefined,
    downy: undefined,
    upx: undefined,
    upy: undefined,
    isdown: false,
}

addEventListener("mousedown", e => {
    mouse.isdown = true;
    mouse.x = e.x;
    mouse.y = e.y;
    mouse.downx = e.x;
    mouse.downy = e.y;
    console.log(JSON.stringify(mouse));
});
addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});
addEventListener("mouseup", e => {
    mouse.isdown = false;
    mouse.upx = e.x;
    mouse.upy = e.y;
    console.log(JSON.stringify(mouse));

    player.vx = (mouse.upx - mouse.downx) * 0.05;
    player.vy = (mouse.upy - mouse.downy) * 0.05;
});

/**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
export function start({ time, canvas, ctx }) {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
}

/**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
export function update({ time, canvas, ctx }) {
    player.vy += player.gravity;

    player.y += player.vy;
    player.x += player.vx;
    if (player.x >= canvas.width) {
        player.vx = 0;
        player.x = canvas.width - player.radius;
    } else if (player.x <= 0) {
        player.vx = 0;
        player.x = player.radius;
    }

    if (player.y + player.radius + player.vy >= canvas.height) {
        player.vy *= -player.bounciness
        player.vx *= 1 - player.friction;
        player.y = canvas.height - player.radius;
    } else if (player.y <= -300) {
        player.vy = 0;
        player.y = -300;
    }
}

/**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
export function draw({ time, canvas, ctx }) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}