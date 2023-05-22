export type GameProps = {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  setGameStateMenu: () => void,
  setGameStateInProgress: () => void,
  setGameStateFinished: () => void,
  setGameStateGameOver: () => void,
  setGameStateWaitNextLevel: () => void,
  setGameStateNextLevel: () => void,
  addScore: () => void,
  gameLevel: number,
  setGameLevel: () => void,
};

export enum GameState {
    Menu = 'Menu',
    InProgress = 'InProgress',
    Finished = 'Finished',
    GameOver = 'GameOver',
    WaitNextLevel = 'WaitNextLevel',
    NextLevel = 'NextLevel'
};
