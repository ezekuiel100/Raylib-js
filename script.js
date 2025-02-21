class RayLibJS {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    document.body.append(this.canvas);

    this.canvas.width = width;
    this.canvas.height = height;

    this.canvas.style.border = "1px solid black";
    this.ctx = this.canvas.getContext("2d");
  }

  drawRectangle(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawCircle() {}
  drawLine() {}
}

const ray = new RayLibJS(800, 700);
ray.drawRectangle(10, 10, 100, 300, "red");
