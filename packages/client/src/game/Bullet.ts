export class Bullet {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    position: { x: number; y: number }
    static step = 80
    static size = 40

    constructor(canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        position: { x: number; y: number }
        ) {
        this.canvas = canvas
        this.context = context
        this.position = position
    }

    public moveUp() {
        if (this.position.y - Bullet.step < 0) return
        this.position.y -= Bullet.step
    }

    public moveDown() {
        if (this.position.y + Bullet.step + Bullet.size > this.canvas.height) return
        this.position.y += Bullet.step
    }

    public moveLeft() {
        if (this.position.x - Bullet.step < 0) return
        this.position.x -= Bullet.step
    }

    public moveRight() {
        if (this.position.x + Bullet.step + Bullet.size > this.canvas.width) return
        this.position.x += Bullet.step
    }

    public render() {
        this.context.beginPath()
        this.context.rect(this.position.x, this.position.y, Bullet.size, Bullet.size)
        this.context.fillStyle = 'blue'
        this.context.fill()
        this.context.closePath()
    }
}
