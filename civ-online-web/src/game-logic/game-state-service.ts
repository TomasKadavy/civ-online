import { WebSocketService } from "../web-socket/web-socket-service";
import { PlayerService } from "./player-service";

export class GameStateService {
    bluePlayer: PlayerService;
    redPlayer: PlayerService;
    currentPlayer: PlayerService;
    webSocketService: WebSocketService;
    hasSelected = false;

    constructor(webSocket: WebSocketService) {
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
        this.webSocketService.sendMessage(`hexClicked ${hexIndex}`);
        this.changeTurn();
        this.hasSelected = true;
    }

    handleSocketMessage(event: MessageEvent) {
        const message = event.data;
        const [command, payload] = message.split(' ');
        switch (command) {
            case 'hexClicked':
                this.currentPlayer.addHex(parseInt(payload));
                this.changeTurn();
                this.hasSelected = false;
                break;
            default:
                console.error('Unknown command:', command);
        }
    }

}