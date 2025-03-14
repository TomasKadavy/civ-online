import { PlayerService } from "../game-logic/player-service";
import { Clickable } from "./button";
import { HEX } from "./constants";

export default class Hex implements Clickable {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    id: number;
    onClick: () => void;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, text: string, id: number, onClick: () => void) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.id = id
        this.onClick = onClick;
    }

    isClicked(x: number, y: number): boolean {
        const hexHeight = this.height;
        const hexWidth = Math.sqrt(3) / 2 * hexHeight;
        
        const vertices = [
            { x: this.x + hexWidth / 2, y: this.y },
            { x: this.x + hexWidth, y: this.y + hexHeight / 4 },
            { x: this.x + hexWidth, y: this.y + 3 * hexHeight / 4 },
            { x: this.x + hexWidth / 2, y: this.y + hexHeight },
            { x: this.x, y: this.y + 3 * hexHeight / 4 },
            { x: this.x, y: this.y + hexHeight / 4 }
        ];
        
        let inside = false;
        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const xi = vertices[i].x;
            const yi = vertices[i].y;
            const xj = vertices[j].x;
            const yj = vertices[j].y;
            
            const intersect = ((yi > y) !== (yj > y)) && 
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                
            if (intersect) inside = !inside;
        }
        
        return inside;
    }

    resize() {
        // figure how to resize the hex              
        this.render()
    }

    render() {
        const hexHeight = this.height;
        const hexWidth = Math.sqrt(3) / 2 * hexHeight;

        this.ctx.fillStyle = HEX.fillBackground;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + hexWidth / 2, this.y);
        this.ctx.lineTo(this.x + hexWidth, this.y + hexHeight / 4);
        this.ctx.lineTo(this.x + hexWidth, this.y + 3 * hexHeight / 4);
        this.ctx.lineTo(this.x + hexWidth / 2, this.y + hexHeight);
        this.ctx.lineTo(this.x, this.y + 3 * hexHeight / 4);
        this.ctx.lineTo(this.x, this.y + hexHeight / 4);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.strokeStyle = 'gray';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.fillStyle = HEX.fillColor;
        this.ctx.font = HEX.font;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.x + hexWidth / 2, this.y + hexHeight / 2);
    }

    renderPlayerTitle(player: PlayerService) {
        // Slightly smaller hexagon
        const hexHeight = this.height * 0.9;
        const hexWidth = Math.sqrt(3) / 2 * hexHeight;

        const offsetX = (this.width - hexWidth) / 2;
        const offsetY = (this.height - hexHeight) / 2;

        this.ctx.fillStyle = player.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + offsetX + hexWidth / 2, this.y + offsetY);
        this.ctx.lineTo(this.x + offsetX + hexWidth, this.y + offsetY + hexHeight / 4);
        this.ctx.lineTo(this.x + offsetX + hexWidth, this.y + offsetY + 3 * hexHeight / 4);
        this.ctx.lineTo(this.x + offsetX + hexWidth / 2, this.y + offsetY + hexHeight);
        this.ctx.lineTo(this.x + offsetX, this.y + offsetY + 3 * hexHeight / 4);
        this.ctx.lineTo(this.x + offsetX, this.y + offsetY + hexHeight / 4);
        this.ctx.closePath();
        this.ctx.fill();
    }
}