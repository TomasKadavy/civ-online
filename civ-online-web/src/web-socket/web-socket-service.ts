import { Game } from "../game";

export const URL = 'ws://localhost:8080/game';

export class WebSocketService {
    private webSocket: WebSocket | null = null;
    private game: Game;

    webSocketId: string = "";

    constructor(game: Game) {
        this.game = game;
    }
    
    startConnection(): void {
        this.webSocket = new WebSocket(URL);
        console.log("WebSocket connection created:", this.webSocket);
        this.addEventListeners();
    }

    sendMessage(message: {type: string, gameId: string, message: string}): void {
        this.webSocket?.send(JSON.stringify(message));
    }

    private addEventListeners(): void {
        this.webSocket?.addEventListener('open', (event) => {
            console.log("WebSocket connection opened:", event);
        });

        this.webSocket?.addEventListener('close', (event) => {
            console.log("WebSocket connection closed:", event);
        });

        this.webSocket?.addEventListener('error', (event) => {
            console.error("WebSocket error:", event);
        });

        this.webSocket?.addEventListener('message', (event) => {
            console.log("WebSocket message received:", event.data);
            this.game.handleSocketMessage(event);
        });
    }

}