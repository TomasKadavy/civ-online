import { GameConfig } from "../game-logic/game-config";
import { PlayerState } from "../game-logic/player-state";

export class CivPlayerPanel extends HTMLElement {

    playerState: PlayerState = {};
    gameConfig: GameConfig = {};

    static get observedAttributes() {
        return ['playerState', 'gameConfig'];
    }

    constructor() {
        super();
        this.render();
    }

    observedAttributes(name: string, oldValue: GameConfig | PlayerState, newValue: GameConfig | PlayerState) {
        this.render();
    }

    render() {
        this.innerHTML = `
            <civ-label text="Player ID" value="${GameConfig.playerId}"></civ-label>
            <civ-label text="Opponent ID" value="${GameConfig.opponentId}"></civ-label>
            <civ-label text="Game ID" value="${GameConfig.gameId}"></civ-label>
            <civ-label text="Gold" value="${PlayerState.gold ?? -1}"></civ-label>
            <civ-label text="Color" value="${'N/A'}"></civ-label>
        `;
    }

}