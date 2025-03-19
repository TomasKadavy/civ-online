import { PlayerState } from "./player-state";

export type PlayerTile = {
    owner: string;
    building: string;
    hexIndex: number;
}

export class GameState {
    // key = hexIndex, Value = PlayerTile
    static tiles = new Map<number, PlayerTile>();
    // key = playerId (socket id), Value = PlayerState
    static playerStates = new Map<string, PlayerState>();
    static turn = "";

    static toJSON(): string {
        const tilesObject: { [key: number]: PlayerTile } = {};
        const statesObject: { [key: string]: PlayerState} = {};

        for (const [key, value] of this.tiles.entries()) {
            tilesObject[key] = value;
        }
        for (const [key, value] of this.playerStates.entries()) {
            statesObject[key] = value;
        }

        const gameStateObject = {
            turn: this.turn,
            board: tilesObject,
            playerStates: statesObject 
        };

        return JSON.stringify(gameStateObject);
    }

    static reset() {
        this.tiles = new Map<number, PlayerTile>();
        this.turn = "";
    }
}