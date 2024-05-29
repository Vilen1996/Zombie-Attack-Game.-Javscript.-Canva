import { ctx, canvas } from "./util.js";
import { Fire } from "./Fire.js";
import { Decoration } from "./Decoration.js";
import { Platform } from "./Platform.js";
import { Player } from "./Player.js";
import { Enemy } from "./Enemy.js";

export class Game {
  enemy = new Enemy();
  platforms = [
    new Platform(0, innerHeight - 100, 500, 100),
    new Platform(500, innerHeight - 300, 500, 80),
    new Platform(1000, innerHeight - 500, 500, 80),
  ];
  player = new Player();
  object = [
    new Decoration(0, innerHeight - 400, 1800, 400, "images/tree2.jpeg"),
    new Decoration(0, innerHeight - 800, 200, 100, "images/cloud.png"),
    new Decoration(300, innerHeight - 700, 200, 100, "images/cloud.png"),
    new Decoration(500, innerHeight - 600, 200, 100, "images/cloud.png"),
    new Decoration(500, innerHeight - 800, 200, 100, "images/cloud.png"),
    new Decoration(100, innerHeight - 600, 200, 100, "images/cloud.png"),
    new Decoration(1000, innerHeight - 800, 200, 100, "images/cloud.png"),
    new Decoration(1300, innerHeight - 600, 200, 100, "images/cloud.png"),
    new Decoration(1300, innerHeight - 800, 200, 100, "images/cloud.png"),
    new Decoration(900, innerHeight - 600, 200, 100, "images/cloud.png"),
  ];
  constructor() {
    window.onkeydown = (e) => {
      if (e.key == "ArrowRight") {
        this.moveRight();
      } else if (e.key == " ") {
        this.player.shoot();
      } else if (e.key == "ArrowUp") {
        this.player.jump();
      }
    };

    this.id = requestAnimationFrame(() => this.run());
  }
  run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.id = requestAnimationFrame(() => this.run());
    this.object.forEach((p) => p.draw());
    this.platforms.forEach((p) => p.draw());
    this.player.move();
    this.checkPlatforms();
    this.enemy.move();
    if (Math.abs(this.player.x - this.enemy.x) < 50) {
      if (Math.abs(this.player.y - this.enemy.y) < 50) {
        cancelAnimationFrame(this.id);
      }
    }
    if (this.player.fire) {
      if (
        Math.abs(this.enemy.y - this.player.fire.y) < 50 &&
        Math.abs(this.enemy.x - this.player.fire.x) < 50
      ) {
        this.count++;
        this.enemy.destroyed();
      }
    }
  }
  moveRight() {
    this.player.moveRight();
    if (this.player.x == 800) {
      [...this.object, ...this.platforms].forEach((p) => (p.x -= 20));
    }
  }

  checkPlatforms() {
    let { x, y } = this.player;
    let last = this.platforms
      .filter((p) => x >= p.x - 80 && x <= p.x - 70 + p.w && y < p.y)
      .at(-1);
    if (last) {
      this.player.low = last.y - 130;
    } else {
      this.player.low = innerHeight - 170;
    }
  }
}
