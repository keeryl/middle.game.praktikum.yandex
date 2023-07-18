type Coords = { x: number; y: number }

export const getInitialPositions: () => {
  ENEMIES: Coords[]
  PLAYER: Coords
} = () => ({
  ENEMIES: [
    { x: 80, y: 0 },
    { x: 0, y: 80 },
    { x: 400, y: 240 },
    { x: 640, y: 400 },
    { x: 560, y: 200 },
  ],
  PLAYER: { x: 160, y: 720 },
})
