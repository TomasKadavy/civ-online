import { PlayerState } from "./player-state";

export type PlayerTile = {
    owner: string;
    building: string;
    hexIndex: number;
}

export class GameState {
    // key = hexIndex, Value = PlayerTile
    private static _tiles = new Map<number, PlayerTile>();
    private static _turn = "";

    static get tiles(): Map<number, PlayerTile> {
        return this._tiles;
    }

    static set tiles(value: Map<number, PlayerTile>) {
        this._tiles = value;
        this.notifyChange();
    }

    static get turn(): string {
        return this._turn;
    }

    static set turn(value: string) {
        this._turn = value;
        this.notifyChange();
    }

    static toJSON(): string {
        const tilesObject: { [key: number]: PlayerTile } = {};

        for (const [key, value] of this.tiles.entries()) {
            tilesObject[key] = value;
        }

        const gameStateObject = {
            turn: this.turn,
            board: tilesObject,
            playerState: PlayerState 
        };

        return JSON.stringify(gameStateObject);
    }

    static reset() {
        this._tiles = new Map<number, PlayerTile>();
        PlayerState.reset();
        this._turn = "";
        this.notifyChange();
    }

    static notifyChange() {
        const event = new CustomEvent("game-state-changed");
        window.dispatchEvent(event);
    }
}