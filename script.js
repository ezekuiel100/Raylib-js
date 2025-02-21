class RayLibJS {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    document.body.append(this.canvas);

    this.canvas.width = width;
    this.canvas.height = height;

    this.mouseLeftButton = 0;
    this.mouseRightButton = 2;
    this.mouseDown = null;

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouseDown = e.button;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.mouseDown = null;
    });

    this.canvas.style.border = "1px solid black";
    this.ctx = this.canvas.getContext("2d");
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

  clearBackground(color) {
    this.ctx.clearRect(0, 10, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  isKeyPressed() {}

  isMouseButtonDown(mouseButton) {
    return this.mouseDown === mouseButton;
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
    console.log("Botão Esquerdo Clicado! 🖱");
  }
  if (rl.isMouseButtonDown(rl.mouseRightButton)) {
    console.log("Botão Direito Clicado! 🖱");
  }
  requestAnimationFrame(loop);
}
loop();
