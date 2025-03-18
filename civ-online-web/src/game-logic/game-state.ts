export type PlayerTile = {
    owner: string;
    building: string;
    hexIndex: number;
}

export class GameState {
    // key = hexIndex, Value = PlayerTile
    static tiles: Map<number, PlayerTile> = new Map<number, PlayerTile>();
    static turn = "";

    static toJSON(): string {
        const tilesObject: { [key: number]: { owner: string, building: string } } = {};

        for (const [key, value] of this.tiles.entries()) {
            tilesObject[key] = value;
        }

        const gameStateObject = {
            turn: this.turn,
            board: tilesObject
        };

        return JSON.stringify(gameStateObject);
    }
}