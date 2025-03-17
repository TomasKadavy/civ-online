import { Game } from "../game";
import { GameStateService } from "../game-logic/game-state-service";

export const URL = 'ws://localhost:8080/game';

// Same enum as in JAVA
export enum ReturnType {
    START_GAME = "START_GAME",
    GAME_FULL = "GAME_FULL",
    WAITING = "WAITING",
    EVENT = "EVENT",
}

export enum SendingType {
    ADD_PLAYER = "ADD_PLAYER",
    EVENT = "EVENT",
}

export type WSMessage = {
    type: ReturnType | SendingType;
    gameId: string;
    message: string;
}

export class WebSocketService {
    static webSocket: WebSocket | null = null;
    static webSocketId: string = "";

    static startConnection(): void {
        this.webSocket = new WebSocket(URL);
        console.log("WebSocket connection created:", this.webSocket);
        this.addEventListeners();
    }

    static sendMessage(message: WSMessage): void {
        this.webSocket?.send(JSON.stringify(message));
    }

    static addEventListeners(): void {
        this.webSocket?.addEventListener('open', (event) => {
            const message: WSMessage = { type: SendingType.ADD_PLAYER, gameId: Game.gameId, message: Game.gameId };
            this.sendMessage(message);
        });

        this.webSocket?.addEventListener('close', (event) => {
        });

        this.webSocket?.addEventListener('error', (event) => {
        });

        this.webSocket?.addEventListener('message', (event) => {
            GameStateService.handleSocketMessage(event);
        });
    }
}