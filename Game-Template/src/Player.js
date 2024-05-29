import { ctx, canvas } from "./util.js";
import { Hp } from "./Hp.js";

export class Player {
  level = 1;
  x = 40;
  y = 200;
  w = 130;
  h = 120;
  playerSpeed = 10;
  img = new Image();
  hp = new Hp();

  draw() {
    this.img.src = `../images/${this.level}.png`;
    this.img.onload = () =>
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.img.onload();
    this.hp.move(this.x + 10, this.y - 50);
  }

  move() {
    this.draw();
  }

  moveRight() {
    this.x += this.playerSpeed;
  }

  moveLeft() {
    this.x -= this.playerSpeed;
  }

  moveUp() {
    this.y -= this.playerSpeed;
  }

  moveDown() {
    this.y += this.playerSpeed;
  }
}
