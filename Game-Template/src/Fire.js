import { ctx, canvas } from "./util.js";
export class Fire {
  img = new Image();
  x = null;
  y = null;
  w = 120;
  h = 40;

  constructor() {
    this.level = 1;
    this.fireSpeed(400);
  }

  draw() {
    this.img.onload();
  }

  fireSpeed(number) {
    setInterval(() => this.increaseLevel(), number);
    this.img.onload = () =>
      ctx.drawImage(this.img, this.x - 30, this.y + 15, this.w, this.h);
  }

  move(u, i) {
    this.draw();
    this.x = u;
    this.y = i;
  }
  increaseLevel() {
    this.level++;
    this.img.src = `../images/fire${this.level}.png`;
    if (this.level >= 4) {
      this.level = 1;
    }
  }
}
