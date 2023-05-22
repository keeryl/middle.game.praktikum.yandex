import { Tank } from './Tank'
import src from '../assets/images/enemy.png'

export class Enemy extends Tank {
  private readonly img: HTMLImageElement

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    position: { x: number; y: number }
  ) {
    super(canvas, context, position)
    this.position = position
    this.img = new Image()
  }

  public render() {
    this.img.src = src
    this.img.width = Tank.size
    this.img.height = Tank.size
    this.img.onload = () => {
      this.context.drawImage(this.img, this.position.x, this.position.y)
    }
  }
}
