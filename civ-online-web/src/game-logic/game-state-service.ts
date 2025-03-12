import { PlayerService } from "./player-service";

export class GameStateService {
    bluePlayer: PlayerService;
    redPlayer: PlayerService;
    currentPlayer: PlayerService;

    constructor() {
        this.bluePlayer = new PlayerService('Tom', 'blue');
        this.redPlayer = new PlayerService('Petr', 'red');
        this.currentPlayer = this.bluePlayer;
    }

    changeTurn() {
        this.currentPlayer = this.currentPlayer === this.bluePlayer ? this.redPlayer : this.bluePlayer;
    }

    hexClicked(hexIndex: number) {
        // check if the hex is already taken
        if (this.bluePlayer.tiles.includes(hexIndex) || this.redPlayer.tiles.includes(hexIndex)) { 
            return;
        }
        this.currentPlayer.addHex(hexIndex);
        this.changeTurn();
    }

}