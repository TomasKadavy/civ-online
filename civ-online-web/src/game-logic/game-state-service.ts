import { Game } from "../game";
import { MenuRenderer } from "../rendering/menu-renderer";
import { WebSocketService, WSMessage, SendingType, ReturnType } from "../web-socket/web-socket-service";
import { GameConfig } from "./game-config";
import { GameState, PlayerTile } from "./game-state";
import { PlayerState } from "./player-state";

export class GameStateService {
    static initialize() {

    }

    static hexClicked(hexIndex: number) {
        // check if the hex is already taken
        const existingTile = GameState.tiles.get(hexIndex);
        if (existingTile && existingTile.owner !== null) {
            return;
        }

        // check if it is player`s turn
        if (GameState.turn !== "" && GameState.turn !== GameConfig.playerId) {
            console.log("RETURNED WRONG turn", GameState.turn, "palyer", GameConfig.playerId);
            return;
        }

        // check if player has enough gold
        if (PlayerState.gold <= 0) {
            console.log("Not enough gold!");
            return; 
        }

        GameState.tiles.set(hexIndex, { owner: GameConfig.playerId, building: "", hexIndex });
        GameState.turn = GameConfig.opponentId;
        const message: WSMessage = { type: SendingType.EVENT, gameId: GameConfig.gameId, message: GameState.toJSON(), playerId: GameConfig.playerId }
        WebSocketService.sendMessage(message);
    }

    static handleSocketMessage(event: MessageEvent) {
        const JSONMessage = JSON.parse(event.data) as WSMessage;
        //console.log("Received message:", JSONMessage);

        switch (JSONMessage.type) {
            case ReturnType.WAITING:
                GameConfig.playerId = JSONMessage.message;
                break;
            case ReturnType.START_GAME:
                // Start the game with both players connected
                const ids = JSONMessage.message.split(";");
                if (GameConfig.playerId === "") {
                    GameConfig.opponentId = ids[0];
                    GameConfig.playerId = ids[1];                    
                } else {
                    GameConfig.opponentId = ids[1];
                }
                
                GameState.turn = ids[0];
                Game.startActualGame();
                MenuRenderer.changeRightMenuForGame();
                break;
            case ReturnType.EVENT:
                const messageParsed = JSON.parse(JSONMessage.message);
                
                // Update the tiles
                for (const [hexIndex, tile] of Object.entries(messageParsed.board)) {
                    const playerTile = tile as PlayerTile;
                    GameState.tiles.set(Number(hexIndex), { owner: playerTile.owner, building: playerTile.building, hexIndex: Number(hexIndex) });
                }

                // Update the playerState
                console.log("message parsed", messageParsed, "playerState", messageParsed.playerState);
                PlayerState.gold = messageParsed.playerState?.gold;
                
                // Update the turn
                GameState.turn = messageParsed.turn;
                break;
            case ReturnType.GAME_FULL:
                this.resetGame();
                break;
            default:
                console.error('Unknown type:', JSONMessage.type);
        }
    }

    static resetGame() {
        GameConfig.reset();
        GameState.reset();
        Game.currentRenderer = MenuRenderer;
        MenuRenderer.changeRightMenuForMenu();
        const lobbyInput = document.getElementById("lobby-id") as HTMLInputElement;
        if (lobbyInput) {
            lobbyInput.value = "";
        }
    }

}