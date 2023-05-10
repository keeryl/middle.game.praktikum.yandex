export class Tank {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  position: { x: number, y: number}
  static step = 80
  static size = 80

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, position: { x: number, y: number}) {
    this.canvas = canvas
    this.context = context
    this.position = position
  }

  public moveUp() {
    if (this.position.y - Tank.step < 0) return
    this.position.y -= Tank.step
  }

  public moveDown() {
    if (this.position.y + Tank.step + Tank.size > this.canvas.height) return
    this.position.y += Tank.step
  }

  public moveLeft() {
    if (this.position.x - Tank.step < 0) return
    this.position.x -= Tank.step
  }

  public moveRight() {
    if (this.position.x + Tank.step + Tank.size > this.canvas.width) return
    this.position.x += Tank.step
  }
}
