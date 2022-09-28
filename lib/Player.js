import { Mouse } from "./Mouse.js";

export class Player {
    x = 0;
    y = 0;
    radius = 20;
    vx = 0;
    vy = -8;
    gravity = 0.1;
    bounciness = 0.3;
    friction = 0.02;

    constructor() {
        Mouse.addUpListener(e => {
            this.vx = (Mouse.upx - Mouse.downx) * 0.05;
            this.vy = (Mouse.upy - Mouse.downy) * 0.05;
        });
    }

    /**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
    start({ time, canvas, ctx }) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }

    /**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
    update({ time, canvas, ctx }) {
        this.vy += this.gravity;

        this.y += this.vy;
        this.x += this.vx;
        if (this.x >= canvas.width) {
            this.vx = 0;
            this.x = canvas.width - this.radius;
        } else if (this.x <= 0) {
            this.vx = 0;
            this.x = this.radius;
        }

        if (this.y + this.radius + this.vy >= canvas.height) {
            this.vy *= -this.bounciness
            this.vx *= 1 - this.friction;
            this.y = canvas.height - this.radius;
        } else if (this.y <= -300) {
            this.vy = 0;
            this.y = -300;
        }
    }

    /**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
    draw({ time, canvas, ctx }) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}