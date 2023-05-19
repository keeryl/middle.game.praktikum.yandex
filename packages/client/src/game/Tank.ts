export class Tank {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  position: { x: number; y: number }
  static step = 80
  static size = 80
  direction: string

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    position: { x: number; y: number }
  ) {
    this.canvas = canvas
    this.context = context
    this.position = position
    this.direction = 'moveUp';
  }

  public moveUp() {
    if (this.position.y - Tank.step < 0) return
    this.position.y -= Tank.step
    this.direction = 'moveUp';
  }

  public moveDown() {
    if (this.position.y + Tank.step + Tank.size > this.canvas.height) return
    this.position.y += Tank.step
    this.direction = 'moveDown';
  }

  public moveLeft() {
    if (this.position.x - Tank.step < 0) return
    this.position.x -= Tank.step
    this.direction = 'moveLeft';
  }

  public moveRight() {
    if (this.position.x + Tank.step + Tank.size > this.canvas.width) return
    this.position.x += Tank.step
    this.direction = 'moveRight';
  }
}
