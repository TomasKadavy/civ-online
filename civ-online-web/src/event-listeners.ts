import { Game } from "./game";

export class EventListeners {
    static ctx: CanvasRenderingContext2D;
    static game: Game;

    static initialize() {
        this.ctx = Game.ctx;
        this.game = Game;

        this.addWheelListener();
        this.addPointerDownListener();
        this.addPointerMoveListener();
        this.addResizeListener();
    }

    static addPointerMoveListener() {
        this.ctx.canvas.addEventListener('pointermove', (e: PointerEvent) => {
            //console.log('Move event', e);
        });
    }

    static addWheelListener() {
        this.ctx.canvas.addEventListener('wheel', (e: WheelEvent) => {
            //console.log('Wheel event', e);
        });
    }

    static addPointerDownListener() {
        this.ctx.canvas.addEventListener('pointerdown', (e: PointerEvent) => {
            const rect = this.ctx.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            Game.handleClick(x, y);
        });
    }

    static addResizeListener() {
        window.addEventListener("resize", () => {
            Game.resize();
        });
    }
}