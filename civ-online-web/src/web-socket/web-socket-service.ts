import { Game } from "../game";
import { GameStateService } from "../game-logic/game-state-service";

export const URL = 'ws://localhost:8080/game';

export class WebSocketService {
    static webSocket: WebSocket | null = null;
    static webSocketId: string = "";

    static startConnection(): void {
        this.webSocket = new WebSocket(URL);
        console.log("WebSocket connection created:", this.webSocket);
        this.addEventListeners();
    }

    static sendMessage(message: {type: string, gameId: string, message: string}): void {
        this.webSocket?.send(JSON.stringify(message));
    }

    static addEventListeners(): void {
        this.webSocket?.addEventListener('open', (event) => {
            console.log("WebSocket connection opened:", event);
            this.webSocket?.send(JSON.stringify({ type: "gameId", message: Game.gameId }))
        });

        this.webSocket?.addEventListener('close', (event) => {
            console.log("WebSocket connection closed:", event);
        });

        this.webSocket?.addEventListener('error', (event) => {
            console.error("WebSocket error:", event);
        });

        this.webSocket?.addEventListener('message', (event) => {
            console.log("WebSocket message received:", event.data);
            GameStateService.handleSocketMessage(event);
        });
    }
}