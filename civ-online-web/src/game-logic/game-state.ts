export type PlayerTile = {
    owner: string;
    building: string;
    hexIndex: number;
}

export class GameState {
    // key = hexIndex, Value = PlayerTile
    static tiles: Map<number, PlayerTile> = new Map<number, PlayerTile>();

    static toJSON(): string {
        const tilesObject: { [key: number]: { owner: string, building: string } } = {};

        for (const [key, value] of this.tiles.entries()) {
            tilesObject[key] = value;
        }
        return JSON.stringify(tilesObject);
    }
}