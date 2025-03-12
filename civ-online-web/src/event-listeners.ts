import { Game } from "./game";

export class EventListeners {
    ctx: CanvasRenderingContext2D;
    game: Game;

    constructor(ctx: CanvasRenderingContext2D, game: Game) {
        this.ctx = ctx;
        this.game = game;

        this.addWheelListener();
        this.addPointerDownListener();
        this.addPointerMoveListener();
        this.addResizeListener();
    }

    private addPointerMoveListener() {
        this.ctx.canvas.addEventListener('pointermove', (e: PointerEvent) => {
            //console.log('Move event', e);
        });
    }

    private addWheelListener() {
        this.ctx.canvas.addEventListener('wheel', (e: WheelEvent) => {
            //console.log('Wheel event', e);
        });
    }

    private addPointerDownListener() {
        this.ctx.canvas.addEventListener('pointerdown', (e: PointerEvent) => {
            const rect = this.ctx.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.game.handleClick(x, y);
        });
    }

    private addResizeListener() {
        window.addEventListener("resize", () => {
            this.game.resize();
        });
    }
}