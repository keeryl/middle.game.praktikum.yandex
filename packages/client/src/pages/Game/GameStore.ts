import { GameState } from "./GameEnum";


class GameStore {
    public state: string;
    public currentLevel: number;
    public countEnemies: number;
    public score: number;


    constructor() {
        this.state = GameState.Menu
        this.currentLevel = 1
        this.countEnemies = 3
        this.score = 0
    }
    
    public setGameStateParameters(world: object) {
        this.countEnemies = world.enemies?.length
        if (this.countEnemies === 0) {
            this.state = 'WaitNextLevel';
            console.log(this.state)
        }
    }
    public setGameState(gameState: string){
        this.state = gameState;
    }
};


export const gameStore = new GameStore();
