type Coords = { x: number; y: number }

export const getInitialPositions: () => {
  ENEMIES: Coords[]
  PLAYER: Coords
} = () => ({
  ENEMIES: [
    { x: 80, y: 0 },
    { x: 400, y: 240 },
    { x: 640, y: 400 },
  ],
  PLAYER: { x: 160, y: 720 },
})
