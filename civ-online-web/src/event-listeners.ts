import { Game } from "./game";

export class EventListeners {

    static initialize() {
        this.addWheelListener();
        this.addPointerDownListener();
        this.addPointerMoveListener();
        this.addResizeListener();
    }

    static addPointerMoveListener() {
        Game.ctx.canvas.addEventListener('pointermove', (e: PointerEvent) => {
            //console.log('Move event', e);
        });
    }

    static addWheelListener() {
        Game.ctx.canvas.addEventListener('wheel', (e: WheelEvent) => {
            //console.log('Wheel event', e);
        });
    }

    static addPointerDownListener() {
        Game.ctx.canvas.addEventListener('pointerdown', (e: PointerEvent) => {
            const rect = Game.ctx.canvas.getBoundingClientRect();
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