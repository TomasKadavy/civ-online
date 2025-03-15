import { Hex } from "../UI/hex";

export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow';

export class PlayerService {
    name: string;
    color: PlayerColor;
    
    // indexes of hexes that player owns
    tiles: number[] = [];

    constructor(name: string, color: PlayerColor) {
        this.name = name;
        this.color = color;
    }

    addHex(hexIndex: number) {
        this.tiles.push(hexIndex);
    }

    renderTiles(hexes: Hex[]) {
        for (const hexIndex of this.tiles) {
            hexes[hexIndex].renderPlayerTitle(this);
        }
    }
    
}