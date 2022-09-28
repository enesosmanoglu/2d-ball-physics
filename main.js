import { Mouse } from "./lib/Mouse.js";
import { Player } from "./lib/Player.js";

let player = new Player();

/**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
export function start({ time, canvas, ctx }) {
    player.start({ time, canvas, ctx });
}

/**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
export function update({ time, canvas, ctx }) {
    player.update({ time, canvas, ctx });
}

/**@param {{time:number,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}} */
export function draw({ time, canvas, ctx }) {
    player.draw({ time, canvas, ctx });
}