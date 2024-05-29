import { ctx, canvas } from "./util.js";
export class Decoration {
  img = new Image();
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img.src = "../images/gun1.png";
    this.img.onload = () =>
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  draw() {
    this.img.onload();
  }
}
