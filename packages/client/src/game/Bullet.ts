import src from '../assets/images/bullet.png'

export class Bullet {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  position: { x: number; y: number }
  static step = 20
  static size = 20
  flying: boolean
  private readonly img: HTMLImageElement

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    position: { x: number; y: number }
  ) {
    this.canvas = canvas
    this.context = context
    this.position = position
    this.flying = true
    this.img = new Image()
  }

  public moveUp() {
    if (this.position.y - Bullet.step < 0) {
      this.flying = false
      return
    }
    this.position.y -= Bullet.step
  }

  public moveDown() {
    if (this.position.y + Bullet.step + Bullet.size > this.canvas.height) {
      this.flying = false
      return
    }
    this.position.y += Bullet.step
  }

  public moveLeft() {
    if (this.position.x - Bullet.step < 0) {
      this.flying = false
      return
    }
    this.position.x -= Bullet.step
  }

  public moveRight() {
    if (this.position.x + Bullet.step + Bullet.size > this.canvas.width) {
      this.flying = false
      return
    }
    this.position.x += Bullet.step
  }

  public render() {
    this.img.src = src
    this.img.width = Bullet.size
    this.img.height = Bullet.size
    this.context.drawImage(this.img, this.position.x, this.position.y);
    this.img.onload = () => {
      this.context.drawImage(this.img, this.position.x, this.position.y);
    }
  }
}
