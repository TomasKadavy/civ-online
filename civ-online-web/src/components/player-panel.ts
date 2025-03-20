import { GameConfig } from "../game-logic/game-config";
import { PlayerState } from "../game-logic/player-state";
import { Hex } from "../UI/hex";

export class CivPlayerPanel extends HTMLElement {
    constructor() {
        super();
        this.render();

        window.addEventListener('game-config-changed', () => this.render());
        window.addEventListener('game-state-changed', () => this.render());
    }

    render() {
        const playerColor = Hex.idToColor(GameConfig.playerId);
    
        this.innerHTML = `
            <civ-label text="Player ID" value="${GameConfig.playerId}"></civ-label><br>
            <civ-label text="Opponent ID" value="${GameConfig.opponentId}"></civ-label><br>
            <civ-label text="Game ID" value="${GameConfig.gameId}"></civ-label><br>
            <br>
            <civ-label text="Gold" value="${PlayerState.gold ?? -1}"></civ-label><br>
            <civ-label text="Color" value="hex color" style="color: ${playerColor};"></civ-label>
        `;
    }
}