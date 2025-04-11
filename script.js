import { KeyboardInput } from "./KeyboardInput.js";
import { MouseInput } from "./MouseInput.js";

class RayLibJS {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    document.body.append(this.canvas);

    this.canvas.width = width;
    this.canvas.height = height;

    this.lastFrameTime = performance.now();
    this.fpsHistory = [];

    this.defineKeyConstants();
    this.keyboard = new KeyboardInput();
    this.mouse = new MouseInput(this.canvas);

    this.mouseLeftButton = 0;
    this.mouseRightButton = 2;

    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    this.canvas.style.border = "1px solid black";
    this.ctx = this.canvas.getContext("2d");
  }

  defineKeyConstants() {
    this.KEY_UP = "ArrowUp";
    this.KEY_DOWN = "ArrowDown";
    this.KEY_LEFT = "ArrowLeft";
    this.KEY_RIGHT = "ArrowRight";
  }

  isKeyPressed(key) {
    return this.keyboard.isKeyPressed(key);
  }

  isMouseButtonPressed(mouseButton) {
    return this.mouse.isMouseButtonPressed(mouseButton);
  }

  isMouseButtonDown(mouseButton) {
    return this.mouse.isMouseButtonDown(mouseButton);
  }

  endDrawing() {
    return this.mouse.endDrawing();
  }

  drawRectangle(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawCircle(x, y, radius, color) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  drawLine(startX, startY, endX, endY, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawText(text, x, y, fontSize, color) {
    this.ctx.font = `${fontSize}px arial`;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }

  getFps() {
    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    let fps = Math.round(1000 / deltaTime);

    this.fpsHistory.push(fps);
    if (this.fpsHistory.length > 60) {
      this.fpsHistory.shift();
    }

    const avgFps =
      this.fpsHistory.reduce((sum, val) => sum + val, 0) /
      this.fpsHistory.length;

    return Math.round(avgFps);
  }

  clearBackground(color) {
    this.ctx.clearRect(0, 10, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const rl = new RayLibJS(800, 700);

function loop() {
  rl.clearBackground("white");

  rl.drawRectangle(10, 10, 100, 300, "red");
  rl.drawCircle(200, 80, 70, "blue"); // centerX, centerY, radius, color
  rl.drawLine(100, 100, 800, 450, "green"); //startX, startY, endX, endY, color
  rl.drawText("ola mundo", 0, 90, 50, "black"); //text, x, y, fontSize, color

  if (rl.isMouseButtonDown(rl.mouseLeftButton)) {
    console.log("Botão Esquerdo segurado! 🖱");
  }
  if (rl.isMouseButtonDown(rl.mouseRightButton)) {
    console.log("Botão Direito segurado! 🖱");
  }

  if (rl.isMouseButtonPressed(rl.mouseLeftButton)) {
    console.log("Botao esquerdo clicado");
  }
  if (rl.isMouseButtonPressed(rl.mouseRightButton)) {
    console.log("Botao direito clicado");
  }

  rl.drawText(rl.getFps(), 10, 20, 20, "black");

  rl.isKeyPressed(rl.KEY_DOWN);

  rl.endDrawing();
  requestAnimationFrame(loop);
}
loop();
