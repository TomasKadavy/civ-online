import { CivButton } from "./components/button";
import { CivLabel } from "./components/label";
import { CivPlayerPanel } from "./components/player-panel";
import { Game } from "./game";

// Register web components
customElements.define('civ-button', CivButton);
customElements.define('civ-label', CivLabel);
customElements.define('civ-player-panel', CivPlayerPanel);

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const game = new Game(ctx);
game.start();