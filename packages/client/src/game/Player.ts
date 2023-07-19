import { Tank } from './Tank'
import src from '../assets/images/player.png'
import srcLeft from '../assets/images/playerLeft.png'
import srcDown from '../assets/images/playerDown.png'
import srcRight from '../assets/images/playerRight.png'

export class Player extends Tank {
  private readonly img: HTMLImageElement
  src: string

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    position: { x: number; y: number }
  ) {
    super(canvas, context, position)
    this.canvas = canvas
    this.context = context
    this.position = position
    this.img = new Image()
    this.src = src
  }

  public turn(direction: string) {
    if (direction === 'left') {
      this.src = srcLeft;
    } else if (direction === 'down') {
      this.src = srcDown;
    } else if (direction === 'right') {
      this.src = srcRight;
    } else if (direction === 'up') {
      this.src = src;
    }
  }

  public render() {
    console.log("render");
    this.img.src = this.src
    this.img.width = Tank.size
    this.img.height = Tank.size
    this.context.drawImage(this.img, this.position.x, this.position.y)
    this.img.onload = () => {
      this.context.drawImage(this.img, this.position.x, this.position.y)
    }
  }
}
