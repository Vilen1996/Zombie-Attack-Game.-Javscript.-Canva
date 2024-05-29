export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = innerWidth - 25;
canvas.height = innerHeight - 25;
canvas.style.backgroundImage = "url('images/welcome.png')";
canvas.style.backgroundSize = "100% 100%";
canvas.style.backgroundPosition = "0% 0%";
