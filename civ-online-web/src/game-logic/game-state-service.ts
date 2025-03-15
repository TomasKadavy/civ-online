import { Game } from "../game";
import { WebSocketService } from "../web-socket/web-socket-service";
import { PlayerService } from "./player-service";

export class GameStateService {
    static bluePlayer: PlayerService;
    static redPlayer: PlayerService;
    static currentPlayer: PlayerService;
    static webSocketService: WebSocketService;
    static game: Game;
    static hasSelected = false;

    static initialize() {
        this.bluePlayer = new PlayerService('Tom', 'blue');
        this.redPlayer = new PlayerService('Petr', 'red');
        this.currentPlayer = this.bluePlayer;
    }

    static changeTurn() {
        this.currentPlayer = this.currentPlayer === this.bluePlayer ? this.redPlayer : this.bluePlayer;
    }

    static hexClicked(hexIndex: number) {
        // check if the hex is already taken
        if (this.bluePlayer.tiles.includes(hexIndex) || this.redPlayer.tiles.includes(hexIndex)) { 
            return;
        }

        //user already clicked on a hex
        if (this.hasSelected) {
            return;
        }

        this.currentPlayer.addHex(hexIndex);
        WebSocketService.sendMessage({ type: 'event', gameId: Game.gameId, message: hexIndex.toString() });
        this.changeTurn();
        this.hasSelected = true;
    }

    static handleSocketMessage(event: MessageEvent) {
        const JSONMessage = JSON.parse(event.data) as { type: string, message: string };
        console.log("GameStateService received message:", event.data, JSONMessage);

        switch (JSONMessage.type) {
            case 'connection':
                WebSocketService.webSocketId = JSONMessage.message;
                break;
            case 'event':
                this.currentPlayer.addHex(parseInt(JSONMessage.message));
                this.changeTurn();
                this.hasSelected = false;
                break;
            default:
                console.error('Unknown type:', JSONMessage.type);
        }
    }

}