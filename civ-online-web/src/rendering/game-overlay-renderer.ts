import { Game } from "../game";
import { Button, Clickable } from "../UI/button";
import { Renderer } from "./renderer";

export class GameOverlayRenderer implements Renderer {
    clickables: Clickable[] = [];
    ctx: CanvasRenderingContext2D;
    game: Game;

    constructor(ctx: CanvasRenderingContext2D, game: Game) {
        this.ctx = ctx;
        this.game = game;

        const canvasWidth = this.ctx.canvas.width;
        const buttonWidth = 90;
        const buttonHeight = 90;

    }

    render(): void {
        this.clickables.forEach((clickable) => {
            clickable.render();
        });
    }

    resize(): void {
        this.clickables.forEach((clickable) => {
            clickable.resize();
        });
    }

}