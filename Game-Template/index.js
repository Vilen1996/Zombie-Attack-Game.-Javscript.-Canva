import { Game } from "./src/Game.js";
import { canvas } from "./src/util.js";
document.getElementById("playButton").addEventListener("click", () => {
  const game = new Game();
  document.getElementById("playButton").style.display = "none";
  canvas.style.backgroundImage = "url('images/map.jpg')";
  canvas.style.backgroundSize = "300% 300%";
  canvas.style.backgroundPosition = "0% 0%";
});
