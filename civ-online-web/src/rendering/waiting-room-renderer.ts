import { Game } from "../game";
import { Clickable } from "../UI/button";
import { WebSocketService } from "../web-socket/web-socket-service";

export class WaitingRoomRenderer {

    static clickables: Clickable[] = [];

    static initialize() {
        WebSocketService.startConnection();
    }

    static render() {
        const canvas = Game.ctx.canvas;

        // Clear the canvas
        Game.ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        Game.ctx.font = '30px Arial';
        Game.ctx.fillStyle = 'white';
        Game.ctx.textAlign = 'center';
        Game.ctx.textBaseline = 'middle';

        // Draw the text
        const text = `Waiting for other player in room: ${Game.gameId}`;
        Game.ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }
}