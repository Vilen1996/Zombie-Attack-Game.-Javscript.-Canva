import { ctx, canvas } from "./util.js";
export class Enemy {
  x = innerWidth - 900;
  y = innerHeight - 380;
  w = 80;
  h = 80;
  img = new Image();
  dx = Math.floor(Math.random() * 5) + 1;
  constructor() {
    this.img.src = "../images/enemy.PNG";
    this.img.onload = () =>
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  draw() {
    this.img.onload();
  }

  move() {
    this.draw();
    this.x -= this.dx;
    if (this.x < 0) {
      this.x = innerWidth + 100;
      this.dx = Math.floor(Math.random() * 5) + 1;
    }
  }
  destroyed() {
    this.x = innerWidth + 100;
    this.dx = Math.floor(Math.random() * 5) + 1;
  }
}
