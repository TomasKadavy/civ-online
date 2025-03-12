import { BUTTON } from "./constants";

export interface Clickable {
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    onClick: () => void;
    isClicked(x: number, y: number): boolean;
    resize(): void;
    render(): void;
}

export class Button implements Clickable {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    onClick: () => void;

    constructor(ctx : CanvasRenderingContext2D, x: number, y: number, width: number, height: number, text: string, onClick: () => void) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.onClick = onClick;
        
        this.render();
    }
    
    isClicked(x: number, y: number): boolean {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }

    resize() {
        // figure how to resize the button              
        this.render()
    }

    render() {
        this.ctx.fillStyle = BUTTON.fillBackground;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.fillStyle = BUTTON.fillColor;
        this.ctx.font = BUTTON.font;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

}