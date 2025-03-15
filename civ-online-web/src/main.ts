import { CivButton } from "./components/button";
import { CivLabel } from "./components/label";
import { CivPlayerPanel } from "./components/player-panel";
import { EventListeners } from "./event-listeners";
import { Game } from "./game";
import { GameStateService } from "./game-logic/game-state-service";
import { MenuRenderer } from "./rendering/menu-renderer";

// Register web components
customElements.define('civ-button', CivButton);
customElements.define('civ-label', CivLabel);
customElements.define('civ-player-panel', CivPlayerPanel);

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Initialize services
Game.initialize(ctx)
EventListeners.initialize();
MenuRenderer.initialize();
GameStateService.initialize();

Game.start();