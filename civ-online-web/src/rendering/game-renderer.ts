import { Game } from "../game";
import { GameStateService } from "../game-logic/game-state-service";
import { Clickable } from "../UI/button";
import { Hex } from "../UI/hex";

export class GameRenderer {
    static hexes: Hex[] = [];
    static clickables: Clickable[] = [];

    static initialize() {
        // Create a hex grid
        const hexSize = 50;
        const hexWidth = Math.sqrt(3) * hexSize;
        const hexHeight = 2 * hexSize;

        const hexesInRow = 10;
        const hexesInColumn = 10;

        for (let row = 0; row < hexesInRow; row++) {
            for (let column = 0; column < hexesInColumn; column++) {
                const x = column * hexWidth + (row % 2) * hexWidth / 2;
                const y = row * 3 / 4 * hexHeight;

                const hex = new Hex(
                    Game.ctx,
                    x,
                    y,
                    hexWidth,
                    hexHeight,
                    "id " + (row * hexesInRow + column).toString(),
                    row * hexesInRow + column,
                    () => {
                        GameStateService.hexClicked(row * hexesInRow + column);
                    }
                );

                this.hexes.push(hex);
                this.clickables.push(hex);
            }
        }
    }

    static render(): void {
        // render all hexes
        for (const hex of this.hexes) {
            hex.render();
        }

        // render game titles
        GameStateService.bluePlayer.renderTiles(this.hexes);
        GameStateService.redPlayer.renderTiles(this.hexes);
    }
    
    static resize(): void {
        console.log("Resizing game renderer");
    }


}