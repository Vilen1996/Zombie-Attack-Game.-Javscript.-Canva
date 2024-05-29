import { ctx, canvas } from "./util.js";
import { Decoration } from "./Decoration.js";
import { Player } from "./Player.js";
import { Zombie } from "./Enemy.js";
import { Fire } from "./Fire.js";

export class Game {
  isRunning = true;
  player = new Player();
  object = new Decoration(400, innerHeight - 400, 200, 75);
  zombies = [];
  backgroundX = 50;
  backgroundY = 50;
  level = 1;
  count = 0;
  totalCount = 0;
  hpCount = 0;
  boss = false;
  fire = new Fire();
  passedLevel = false;
  fireW = 120;
  fireline = 70;
  levelPassedMessage = "";
  score = 0;
  a = new Audio("./audio/kill.mp3");
  b = new Audio("./audio/main.mp3");

  // Zombie Section

  createZombie(level, boss = false) {
    if (boss == true) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speed = 2;
      const zombie = new Zombie(x, y, speed, level);
      zombie.h = 300;
      zombie.w = 300;
      this.zombies.push(zombie);
      this.totalCount = 0;
    } else {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speed = 1;
      const zombie = new Zombie(x, y, speed, level);
      this.zombies.push(zombie);
    }
  }

  updateZombie() {
    this.zombies.forEach((zombie) => {
      zombie.update(this.player.x, this.player.y);
      zombie.draw();
      if (this.fire) {
        if (
          Math.abs(zombie.y - this.fire.y) < this.fireline &&
          Math.abs(zombie.x - this.fire.x) < this.fireline
        ) {
          if (this.count != undefined) {
            this.count++;
            this.a.play();
          }
          this.totalCount++;
          this.score++;
          if (this.totalCount == 1000 && this.boss == true) {
            setTimeout(() => {
              this.zombies = [];
            }, 500);
            this.zombies.map((a) => (a.img.src = "../images/blood.png"));
            let img = new Image();
            img.src = "../images/win.jpg";
            img.onload = () => {
              this.fire.move(4000, 500);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              ctx.font = "50px serif";
              ctx.fillStyle = "white";
              const scoreText = `Score: ${this.score}`;
              const textWidth = ctx.measureText(scoreText).width;
              ctx.fillText(scoreText, canvas.width - textWidth - 720, 100);
              cancelAnimationFrame(this.id);
            };
          }
          if (this.count == 1) {
            zombie.destroyed();
          } else if (this.count == 2) {
            zombie.destroyed1();
          } else if (this.count == 3) {
            zombie.destroyed2();
          } else if (this.count == 4) {
            this.count = 0;
            zombie.destroyed3();
          }
          if (this.totalCount == 1000) {
            setTimeout(() => {
              this.zombies = [];
              this.passedLevel = true;
              this.levelPassedMessage =
                "Level Passed! Go right to the next level, don't forget to take the gun";
            }, 500);
            this.zombies.map((a) => (a.img.src = "../images/blood.png"));
            this.totalCount = 0;
          }
        }
      }

      if (Math.abs(this.player.x - zombie.x) < 10) {
        if (Math.abs(this.player.y - zombie.y) < 10) {
          this.hpCount++;
          if (this.hpCount >= 50) {
            this.player.hp.decreaseHp();
            this.hpCount = 0;
            if (this.player.hp.level == 13) {
              let img = new Image();
              img.src = "../images/gameover.jpg";
              img.onload = () => {
                this.fire.move(4000, 500);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.font = "50px serif";
                ctx.fillStyle = "white";
                const scoreText = `Score: ${this.score}`;
                const textWidth = ctx.measureText(scoreText).width;
                ctx.fillText(scoreText, canvas.width - textWidth - 750, 100);
                cancelAnimationFrame(this.id);
              };
            }
          }
        }
      }
    });
  }

  // End of zombie section

  constructor() {
    window.onkeydown = (e) => {
      if (this.isRunning) {
        if (e.key == "ArrowRight") {
          this.player.moveRight();
        } else if (e.key == "ArrowLeft") {
          if (this.player.x == -40) {
          } else {
            this.player.moveLeft();
          }
        } else if (e.key == "ArrowUp") {
          if (this.player.y == 10) {
          } else {
            this.player.moveUp();
          }
        } else if (e.key == "ArrowDown") {
          if (this.player.y == 640) {
          } else {
            this.player.moveDown();
          }
        }
      }
      this.a.preload = "auto";
    };

    for (let j = 0; j < Math.random() * 10; j++) {
      for (let i = 0; i < Math.random() * 100; i++) {
        this.createZombie(1);
      }
    }

    this.id = requestAnimationFrame(() => this.run());
  }

  run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.id = requestAnimationFrame(() => this.run());
    this.player.move();
    this.object.draw();
    this.fire.move(this.player.x + 150, this.player.y + 30);
    this.updateZombie();
    this.b.play();
    ctx.font = "30px serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.score}`, 1500, 50);
    if (this.levelPassedMessage) {
      ctx.font = "50px Arial";
      ctx.fillStyle = "yellow";
      ctx.fillText(
        this.levelPassedMessage,
        canvas.width / 2 - 750,
        canvas.height / 2 - 300
      );
    }

    // Guns on map section

    if (
      Math.abs(this.player.y - this.object.y) < 50 &&
      Math.abs(this.player.x - this.object.x) < 50
    ) {
      this.fire.fireSpeed(100);
      this.fire.w = this.fireW += 80;
      this.fireline += 20;
      this.object.x = -200;
      this.player.level++;
    }

    // Game levels' sections

    if (
      this.player.x == 1500 &&
      this.level == 1 &&
      this.passedLevel == true &&
      this.fireW == 200
    ) {
      canvas.style.backgroundPosition = `${this.backgroundX}% ${this.backgroundY}%`;
      this.object.img.src = "../images/gun2.png";
      this.object.x = 500;
      this.object.h = 70;
      this.player.x = 30;
      this.level++;
      this.passedLevel = false;
      this.levelPassedMessage = "";
      for (let j = 0; j < this.level * 2; j++) {
        for (let i = 0; i < this.level * 2; i++) {
          this.createZombie(2);
        }
      }
    }

    if (
      this.player.x == 1500 &&
      this.level == 2 &&
      this.passedLevel == true &&
      this.fireW == 280
    ) {
      this.backgroundX += 50;
      this.backgroundY += 50;
      canvas.style.backgroundPosition = `${this.backgroundX}% ${this.backgroundY}%`;
      this.object.img.src = "../images/gun3.png";
      this.object.x = 600;
      this.object.h = 70;
      this.player.x = 30;
      this.level++;
      this.passedLevel = false;
      this.levelPassedMessage = "";
      for (let j = 0; j < this.level * 3; j++) {
        for (let i = 0; i < this.level * 3; i++) {
          this.createZombie(3);
        }
      }
    }

    if (
      this.player.x == 1500 &&
      this.level == 3 &&
      this.passedLevel == true &&
      this.fireW == 360
    ) {
      this.backgroundX -= 100;
      canvas.style.backgroundPosition = `${this.backgroundX}% ${this.backgroundY}%`;
      this.object.img.src = "../images/gun4.png";
      this.object.x = 700;
      this.object.h = 70;
      this.player.x = 30;
      this.level++;
      this.passedLevel = false;
      this.levelPassedMessage = "";
      for (let j = 0; j < this.level; j++) {
        for (let i = 0; i < this.level * 2; i++) {
          this.createZombie(4);
        }
      }
    }

    if (
      this.player.x == 1500 &&
      this.level == 4 &&
      this.passedLevel == true &&
      this.fireW == 440
    ) {
      this.backgroundX += 50;
      canvas.style.backgroundPosition = `${this.backgroundX}% ${this.backgroundY}%`;
      this.player.x = 30;
      this.level++;
      this.passedLevel = false;
      this.createZombie(5, true);
      this.count = undefined;
      this.boss = true;
      this.levelPassedMessage = "";
    }
  }
}
