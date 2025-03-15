import { Game } from "../game";
import { WebSocketService } from "../web-socket/web-socket-service";
import { PlayerService } from "./player-service";

export class GameStateService {
    bluePlayer: PlayerService;
    redPlayer: PlayerService;
    currentPlayer: PlayerService;
    webSocketService: WebSocketService;
    game: Game;
    hasSelected = false;

    constructor(webSocket: WebSocketService, game: Game) {
        this.game = game;
        this.bluePlayer = new PlayerService('Tom', 'blue');
        this.redPlayer = new PlayerService('Petr', 'red');
        this.currentPlayer = this.bluePlayer;
        this.webSocketService = webSocket;
    }

    changeTurn() {
        this.currentPlayer = this.currentPlayer === this.bluePlayer ? this.redPlayer : this.bluePlayer;
    }

    hexClicked(hexIndex: number) {
        // check if the hex is already taken
        if (this.bluePlayer.tiles.includes(hexIndex) || this.redPlayer.tiles.includes(hexIndex)) { 
            return;
        }

        //user already clicked on a hex
        if (this.hasSelected) {
            return;
        }

        this.currentPlayer.addHex(hexIndex);
        this.webSocketService.sendMessage({ type: 'event', gameId: this.game.gameId, message: hexIndex.toString() });
        this.changeTurn();
        this.hasSelected = true;
    }

    handleSocketMessage(event: MessageEvent) {
        const JSONMessage = JSON.parse(event.data) as { type: string, message: string };
        console.log("GameStateService received message:", event.data, JSONMessage);

        switch (JSONMessage.type) {
            case 'connection':
                this.webSocketService.webSocketId = JSONMessage.message;
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