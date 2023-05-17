type Coords = { x: number; y: number }

export const getInitialPositions: () => {
  ENEMIES: Coords[]
  PLAYER: Coords
} = () => ({
  ENEMIES: [
    { x: 40, y: 0 },
    { x: 380, y: 240 },
    { x: 680, y: 400 },
  ],
  PLAYER: { x: 160, y: 720 },
})
