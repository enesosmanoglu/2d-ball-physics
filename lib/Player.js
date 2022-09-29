import { Mouse } from "./Mouse.js";

export class Player {
    x = 0;
    y = 0;
    radius = 10;
    vx = 0;
    vy = -2;
    gravity = 9.8;
    bounciness = 5;
    friction = 0.02;
    speed = 100;

    constructor() {
        Mouse.addUpListener(e => {
            this.vx = (Mouse.upx - Mouse.downx) * 0.05;
            this.vy = (Mouse.upy - Mouse.downy) * 0.05;
        });
    }

    /**@param {{canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,time:number,dt:number}} */
    start({ canvas, ctx, time, dt }) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }

    /**@param {{canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,time:number,dt:number}} */
    update({ canvas, ctx, time, dt }) {
        this.y += this.vy * this.speed * dt;
        this.x += this.vx * this.speed * dt;

        if (this.x >= canvas.width) {
            this.vx *= -this.bounciness / this.radius;
            this.x = canvas.width - this.radius;
        } else if (this.x <= 0) {
            this.vx *= -this.bounciness / this.radius;
            this.x = this.radius;
        }

        if (this.y + this.radius + this.vy >= canvas.height) {
            this.vy *= -this.bounciness / this.radius;
            this.vx *= 1 - this.friction;
            this.y = canvas.height - this.radius;
        } else if (this.y <= 0) {
            this.vy *= -this.bounciness / this.radius;
            this.y = 0;
        }

        this.vy += this.gravity * dt;
    }

    /**@param {{canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,time:number,dt:number}} */
    draw({ canvas, ctx, time, dt }) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}