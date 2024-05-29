import { ctx, canvas } from "./util.js";
import { Fire } from "./Fire.js";
export class Player {
  level = 1;
  x = 30;
  dy = 5;
  y = 200;
  low = innerHeight - 240;
  w = 150;
  h = 150;
  img = new Image();
  fire = null;

  shoot() {
    this.fire = new Fire(this.x + 150, this.y + 30);
  }

  constructor() {
    this.img.src = `../images/${this.level}.PNG`;
    this.img.onload = () =>
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  draw() {
    this.img.onload();
    if (this.fire) {
      this.fire.move();
    }
  }

  move() {
    this.draw();
    this.y += this.dy;
    if (this.y >= this.low) {
      this.y = this.low;
    }
    if (this.y < 700) {
      this.dy++;
    }
  }

  moveRight() {
    this.level++;
    this.img.src = `../images/${this.level}.PNG`;
    if (this.x >= 800) {
      this.x = 800;
    } else {
      this.x += 10;
    }

    if (this.level >= 6) {
      this.level = 0;
    }
  }

  moveLeft() {
    this.level++;
    this.img.src = `../images/${this.level}.PNG`;
    this.x -= 10;
    if (this.level >= 6) {
      this.level = 0;
    }
  }
  jump() {
    this.dy = -20;
  }
}
