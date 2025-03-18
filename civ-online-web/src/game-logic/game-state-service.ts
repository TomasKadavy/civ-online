import { Game } from "../game";
import { MenuRenderer } from "../rendering/menu-renderer";
import { WebSocketService, WSMessage, SendingType, ReturnType } from "../web-socket/web-socket-service";
import { GameConfig } from "./game-config";
import { GameState, PlayerTile } from "./game-state";

export class GameStateService {
    static initialize() {

    }

    static hexClicked(hexIndex: number) {
        // check if the hex is already taken
        const existingTile = GameState.tiles.get(hexIndex);
        if (existingTile && existingTile.owner !== null) {
            return;
        }

        GameState.tiles.set(hexIndex, { owner: GameConfig.playerId, building: "", hexIndex });
        const message: WSMessage = { type: SendingType.EVENT, gameId: GameConfig.gameId, message: GameState.toJSON() }
        WebSocketService.sendMessage(message);
    }

    static handleSocketMessage(event: MessageEvent) {
        const JSONMessage = JSON.parse(event.data) as WSMessage;
        //console.log("Received message:", event.data, JSONMessage);

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

                Game.startActualGame();
                MenuRenderer.changeRightMenu();
                break;
            case ReturnType.EVENT:
                const messageParsed = JSON.parse(JSONMessage.message);
                for (const [hexIndex, tile] of Object.entries(messageParsed.board)) {
                    const playerTile = tile as PlayerTile;
                    GameState.tiles.set(Number(hexIndex), { owner: playerTile.owner, building: playerTile.building, hexIndex: Number(hexIndex)});
                }
                break;
            default:
                console.error('Unknown type:', JSONMessage.type);
        }
    }

}