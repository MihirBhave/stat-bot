import { Canvas, createCanvas, CanvasRenderingContext2D } from "canvas";
import { AttachmentBuilder } from "discord.js";

type Stats = {
  height: number;
  width: number;
  points: {
    x: number;
    y: number;
  }[];
};

export default class Board {
  canvas: Canvas;
  ctx: CanvasRenderingContext2D;
  constructor(stats: Stats) {
    this.canvas = createCanvas(700, 700);
    this.ctx = this.canvas.getContext("2d");

    //draw board
    const { width, height } = this.canvas;
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "bold";
    this.ctx.beginPath();
    this.ctx.moveTo(10, 0);
    this.ctx.lineTo(10, height - 10);
    this.ctx.lineTo(width - 10, height - 10);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  getImage() {
    return {
      image: new AttachmentBuilder(this.canvas.toBuffer(), {
        name: "stats.png",
      }),
      url: `attachment://stats.png`,
    };
  }
}
