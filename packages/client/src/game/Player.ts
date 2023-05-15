import { Tank } from './Tank'

export class Player extends Tank {
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    position: { x: number; y: number }
  ) {
    super(canvas, context, position)
    this.position = position
  }

  public render() {
    this.context.beginPath()
    this.context.rect(this.position.x, this.position.y, Tank.size, Tank.size)
    this.context.fillStyle = 'green'
    this.context.fill()
    this.context.closePath()
  }
}
