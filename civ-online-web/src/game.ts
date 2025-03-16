import { EventListeners } from "./event-listeners";
import { GameStateService } from "./game-logic/game-state-service";
import { GameRenderer } from "./rendering/game-renderer";
import { MenuRenderer } from "./rendering/menu-renderer";
import { WebSocketService } from "./web-socket/web-socket-service";

// The main game class having all the game states and logic
export class Game {
    static eventListeners: EventListeners;
    static ctx: CanvasRenderingContext2D;
    static currentRenderer: any;
    static gameState: GameStateService;
    static webSocketService: WebSocketService;

    static gameId: string = '';

    static initialize(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.currentRenderer = MenuRenderer;
    }

    // Starts the game loop
    static start() {
        this.gameLoop(0);
    }
    
    // Handles the click event on the canvas
    static handleClick(x: number, y: number) {
        for (const clickable of this.currentRenderer.clickables) {
            if (clickable.isClicked(x, y)) {
                clickable.onClick();
                return;
            }
        }
    }

    static resize() {
        // const rect = this.ctx.canvas.parentElement!.getBoundingClientRect();
        // const pixelRatio = window.devicePixelRatio;
    
        // const screen = new Vector(rect.width, rect.height);
        // this.ctx.canvas.style.width = `${screen.x}px`;
        // this.ctx.canvas.style.height = `${screen.y}px`;
    
        // const canvasSize = screen.mul(pixelRatio);
    
        // this.ctx.canvas.width = canvasSize.x;
        // this.ctx.canvas.height = canvasSize.y;
    
        // // resize all UI elements
        // if (this.currentRenderer) {
        //     this.currentRenderer.resize();
        // }
    }

    static startActualGame(gameId: string) {
        this.gameId = gameId;
        WebSocketService.startConnection();
        GameRenderer.initialize();
        this.currentRenderer = GameRenderer;
    }



    //The game loop using requestAnimationFrame
    static gameLoop(time: number): number {
        this.ctx.reset();
        this.currentRenderer.render();
        return requestAnimationFrame((t) => this.gameLoop(t));
    }


}