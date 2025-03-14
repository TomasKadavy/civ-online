import { Game } from "../game";
import { Button, Clickable } from "../UI/button";
import { Renderer } from "./renderer";

export class MenuRenderer implements Renderer {
    clickables: Clickable[] = [];
    ctx: CanvasRenderingContext2D;
    game: Game;

    constructor(ctx: CanvasRenderingContext2D, game: Game) {
        this.ctx = ctx;
        this.game = game;

        const canvasWidth = this.ctx.canvas.width;
        const buttonWidth = 600;
        const buttonHeight = 150;

        this.clickables.push(new Button(
            this.ctx,
            (canvasWidth - buttonWidth) / 2,
            100,
            buttonWidth,
            buttonHeight,
            'Play mulitplayer',
            () => {
                this.game.startActualGame();
                this.changeRightMenu();
            }
        ));
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

    private changeRightMenu() {
        const menuWrapper = document.getElementById('menu-wrapper');
        const gameWrapper = document.getElementById('game-wrapper');
        if (menuWrapper) {
            menuWrapper.style.display = 'none';
        }
        if (gameWrapper) {
            gameWrapper.style.display = 'flex';
        }   
    }
}