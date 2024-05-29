import { ctx, canvas } from "./util.js";
export class Fire {
  img = new Image();

  constructor(x, y) {
    this.img.src = "../images/fire.PNG";
    this.x = x;
    this.y = y;
    this.img.onload = () => ctx.drawImage(this.img, this.x, this.y, 40, 40);
  }

  draw() {
    this.img.onload();
  }

  move() {
    this.draw();
    this.x += 8;
  }
}
