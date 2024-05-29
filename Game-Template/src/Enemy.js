import { ctx, canvas } from "./util.js";

export class Zombie {
  img = new Image();
  w = 150;
  h = 150;
  constructor(x, y, speed, level) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.level = level;
    this.img.src = `../images/zombie${this.level}.png`;
  }

  draw() {
    this.img.onload = () =>
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.img.onload();
  }

  update(x, y) {
    const dx = x - this.x + 5;
    const dy = y - this.y + 5;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.speed) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
  }

  async destroyed() {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
    this.img.src = "../images/blood.png";
    this.img.src = `../images/zombie${this.level}.png`;
    this.x = innerWidth + 100;
    this.y = Math.floor(Math.random() * 1000);
  }

  async destroyed1() {
    this.img.src = "../images/blood.png";

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    this.img.src = `../images/zombie${this.level}.png`;
    this.x = innerWidth - 2000;
    this.y = Math.floor(Math.random() * 1000);
  }

  async destroyed2() {
    this.img.src = "../images/blood.png";

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });

    this.img.src = `../images/zombie${this.level}.png`;
    this.x = Math.floor(Math.random() * 1700);
    this.y = innerHeight + 200;
  }

  async destroyed3() {
    this.img.src = "../images/blood.png";

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });

    this.img.src = `../images/zombie${this.level}.png`;
    this.x = Math.floor(Math.random() * 1700);
    this.y = innerHeight - 1000;
  }
}
