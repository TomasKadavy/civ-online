import { Clickable } from "../UI/button";

export interface Renderer {
    render(): void;
    resize(): void;
    clickables: Clickable[];
}