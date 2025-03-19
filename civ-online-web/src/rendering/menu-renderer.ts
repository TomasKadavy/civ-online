import { Game } from "../game";
import { GameConfig } from "../game-logic/game-config";
import { Button, Clickable } from "../UI/button";
import { WaitingRoomRenderer } from "./waiting-room-renderer";

export class MenuRenderer {
    static clickables: Clickable[] = [];
    static gameId: string = '';

    static initialize() {
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
                
                // Waiting room
                WaitingRoomRenderer.initialize();
                GameConfig.gameId = this.gameId;
                Game.startWaitingRoom();
                this.hideAllRightMenues();
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

    static changeRightMenuForGame() {
        const menuWrapper = document.getElementById('menu-wrapper');
        const gameWrapper = document.getElementById('game-wrapper');
        if (menuWrapper) {
            menuWrapper.style.display = 'none';
        }
        if (gameWrapper) {
            gameWrapper.style.display = 'flex';
        }   
    }

    static changeRightMenuForMenu() {
        const menuWrapper = document.getElementById('menu-wrapper');
        const gameWrapper = document.getElementById('game-wrapper');
        if (menuWrapper) {
            menuWrapper.style.display = 'flex';
        }
        if (gameWrapper) {
            gameWrapper.style.display = 'none';
        }   
    }

    static hideAllRightMenues() {
        const menuWrapper = document.getElementById('menu-wrapper');
        const gameWrapper = document.getElementById('game-wrapper');
        if (menuWrapper) {
            menuWrapper.style.display = 'none';
        }
        if (gameWrapper) {
            gameWrapper.style.display = 'none';
        } 
    }
}