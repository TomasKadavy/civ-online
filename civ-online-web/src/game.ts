import { EventListeners } from "./event-listeners";
import { GameStateService } from "./game-logic/game-state-service";
import { GameRenderer } from "./rendering/game-renderer";
import { MenuRenderer } from "./rendering/menu-renderer";
import { Renderer } from "./rendering/renderer";
import { URL, WebSocketService } from "./web-socket/web-socket-service";

// The main game class having all the game states and logic
export class Game {
    eventListeners: EventListeners;
    ctx: CanvasRenderingContext2D;
    currentRenderer: Renderer;
    gameState: GameStateService;
    webSocketService: WebSocketService;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.eventListeners = new EventListeners(ctx, this);
        this.currentRenderer = new MenuRenderer(ctx, this);
        this.webSocketService = new WebSocketService(URL, this);
        this.gameState = new GameStateService(this.webSocketService);
    }

    // Starts the game loop
    start() {
        this.gameLoop(0);
    }
    
    // Handles the click event on the canvas
    handleClick(x: number, y: number) {
        for (const clickable of this.currentRenderer.clickables) {
            if (clickable.isClicked(x, y)) {
                clickable.onClick();
                return;
            }
        }
    }

    resize() {
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

    startActualGame() {
        this.currentRenderer = new GameRenderer(this.ctx, this.gameState, this);
    }

    handleSocketMessage(event: MessageEvent) {
        this.gameState.handleSocketMessage(event);
    }

    //The game loop using requestAnimationFrame
    private gameLoop(time: number): number {
        this.ctx.reset();
        this.currentRenderer.render();
        return requestAnimationFrame((t) => this.gameLoop(t));
    }


}