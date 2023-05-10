type Coords = { x: number; y: number }

export const getInitialPositions: (canvas: HTMLCanvasElement) => {
  ENEMIES: Coords[]
  PLAYER: Coords
} = (canvas: HTMLCanvasElement) => ({
  ENEMIES: [
    { x: 0, y: 0 },
    { x: canvas.width / 2 - 40, y: 0 },
    { x: canvas.width - 80, y: 0 },
  ],
  PLAYER: { x: 160, y: 160 },
})
