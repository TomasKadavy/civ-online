import { Game } from "../game";
import { MenuRenderer } from "../rendering/menu-renderer";
import { WebSocketService, WSMessage, SendingType, ReturnType } from "../web-socket/web-socket-service";
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
        const message: WSMessage = { type: SendingType.EVENT, gameId: Game.gameId, message: hexIndex.toString() }
        WebSocketService.sendMessage(message);
        this.changeTurn();
        this.hasSelected = true;
    }

    static handleSocketMessage(event: MessageEvent) {
        const JSONMessage = JSON.parse(event.data) as WSMessage;
        console.log("Received message:", event.data, JSONMessage);

        switch (JSONMessage.type) {
            case ReturnType.WAITING:
                WebSocketService.webSocketId = JSONMessage.message;
                break;
            case ReturnType.START_GAME:
                // Start the game with both players connected
                Game.startActualGame();
                MenuRenderer.changeRightMenu();
                break;
            case ReturnType.EVENT:
                // this.currentPlayer.addHex(parseInt(JSONMessage.message));
                // this.changeTurn();
                // this.hasSelected = false;
                break;
            default:
                console.error('Unknown type:', JSONMessage.type);
        }
    }

}