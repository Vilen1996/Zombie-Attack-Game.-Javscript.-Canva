import { ctx, canvas } from "./util.js";

export class Hp {
  img = new Image();
  x = null;
  y = null;
  w = 120;
  h = 40;
  level = 1;
  constructor() {}

  draw() {
    if (this.level != 13) {
      this.img.src = `../images/hp${this.level}.png`;
      this.img.onload = () =>
        ctx.drawImage(this.img, this.x - 30, this.y + 15, this.w, this.h);
      this.img.onload();
    }
  }

  move(u, i) {
    this.draw();
    this.x = u;
    this.y = i;
  }
  decreaseHp() {
    this.level++;
    if (this.level == 13) {
      this.img.src = `../images/hp12.png`;
    } else {
      this.img.src = `../images/hp${this.level}.png`;
    }
  }
}
