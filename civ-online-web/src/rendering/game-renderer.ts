import { Game } from "../game";
import { GameStateService } from "../game-logic/game-state-service";
import { Clickable } from "../UI/button";
import Hex from "../UI/hex";
import { GameOverlayRenderer } from "./game-overlay-renderer";
import { Renderer } from "./renderer";

export class GameRenderer implements Renderer {
    ctx: CanvasRenderingContext2D;
    gameState: GameStateService;
    game: Game;
    gameOverlayRenderer: GameOverlayRenderer;

    hexes: Hex[] = [];
    clickables: Clickable[] = [];

    constructor(ctx: CanvasRenderingContext2D, gameState: GameStateService, game: Game) {
        this.ctx = ctx;
        this.game = game;
        this.gameOverlayRenderer = new GameOverlayRenderer(ctx, game);
        this.gameState = gameState;

        this.initialize();
    }

    render(): void {
        // render all hexes
        for (const hex of this.hexes) {
            hex.render();
        }

        // render game menu overlay
        this.gameOverlayRenderer.render();

        // render game titles
        this.gameState.bluePlayer.renderTiles(this.hexes);
        this.gameState.redPlayer.renderTiles(this.hexes);
    }

    resize(): void {
        console.log("Resizing game renderer");
    }

    private initialize() {
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
                    this.ctx,
                    x,
                    y,
                    hexWidth,
                    hexHeight,
                    "id " + (row * hexesInRow + column).toString(),
                    row * hexesInRow + column,
                    () => {
                        this.gameState.hexClicked(row * hexesInRow + column);
                    }
                );

                this.hexes.push(hex);
                this.clickables.push(hex);
            }
        }
    }

}