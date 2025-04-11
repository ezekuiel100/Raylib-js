export class MouseInput {
  constructor(canvas) {
    this.mouseDown = new Set();
    this.mousePressed = new Set();

    canvas.addEventListener("mousedown", (e) => {
      this.mouseDown.add(e.button);
      this.mousePressed.add(e.button);
    });

    canvas.addEventListener("mouseup", (e) => {
      this.mouseDown.delete(e.button);
    });
  }

  isMouseButtonDown(mouseButton) {
    return this.mouseDown.has(mouseButton);
  }

  isMouseButtonPressed(mouseButton) {
    return this.mousePressed.has(mouseButton);
  }

  endDrawing() {
    this.mousePressed.clear();
  }
}
