import { Canvas, createCanvas, CanvasRenderingContext2D } from "canvas";
import { AttachmentBuilder } from "discord.js";

type Stats = {
  height: number;
  width: number;
  points: {
    x: number;
    y: number;
    value: string;
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

    let gap = 20;

    this.ctx.lineWidth = 10;
    this.ctx.beginPath();
    this.ctx.moveTo(gap, gap);
    this.ctx.lineTo(gap, height - gap);
    this.ctx.lineTo(width - gap, height - gap);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.strokeStyle = "red";
    stats.points.forEach((p, i) => {
      let prev = i < 1 ? { x: gap, y: height - gap } : stats.points[i - 1];
      let { x, y } = p;

      this.ctx.beginPath();
      this.ctx.moveTo(prev.x, prev.y);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.fillStyle = "red";
      this.ctx.font = "20px Sans";
      this.ctx.fillText(p.value, x - gap, y - gap);
    });
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
