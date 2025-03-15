import { Game } from "../game";
import { Button, Clickable } from "../UI/button";

export class MenuRenderer {
    static clickables: Clickable[] = [];
    static gameId: string = '';

    static initialize() {
        console.log()
        const canvasWidth = Game.ctx.canvas.width;
        const buttonWidth = 600;
        const buttonHeight = 150;
    
        document.getElementById('lobby-id')?.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.gameId = target.value;
        });
    
        this.clickables.push(new Button(
            Game.ctx,
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
                Game.startActualGame(this.gameId);
                this.changeRightMenu();
            }
        ));
    }


    static render(): void {
        this.clickables.forEach((clickable) => {
            clickable.render();
        });
    }

    static resize(): void {
        this.clickables.forEach((clickable) => {
            clickable.resize();
        });
    }

    static changeRightMenu() {
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