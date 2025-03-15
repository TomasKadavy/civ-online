import { Game } from "../game";
import { Button, Clickable } from "../UI/button";
import { Renderer } from "./renderer";

export class MenuRenderer implements Renderer {
    clickables: Clickable[] = [];
    ctx: CanvasRenderingContext2D;
    game: Game;

    gameId: string = '';

    constructor(ctx: CanvasRenderingContext2D, game: Game) {
        this.ctx = ctx;
        this.game = game;

        const canvasWidth = this.ctx.canvas.width;
        const buttonWidth = 600;
        const buttonHeight = 150;

        document.getElementById('lobby-id')?.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.gameId = target.value;
        });

        this.clickables.push(new Button(
            this.ctx,
            (canvasWidth - buttonWidth) / 2,
            100,
            buttonWidth,
            buttonHeight,
            'Play mulitplayer',
            () => {
                if (this.gameId === '') {
                    alert('Please enter a game ID');
                    return;
                }
                this.game.startActualGame(this.gameId);
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