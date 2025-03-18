export class CivPlayerPanel extends HTMLElement {

    static get observedAttributes() {
        return ['playerState'];
    }

    constructor() {
        super();
        this.render();
    }

    observedAttributes(name: string, oldValue: string, newValue: string) {
        if (name === 'playerState') {
            this.playerState = JSON.parse(newValue);
        }
        this.render();
    }

    render() {
        this.innerHTML = `
            <civ-label text="Player" value="${this.playerState?.name}"></civ-label>
            <civ-label text="Color" value="${this.playerState?.color}"></civ-label>
            <civ-label text="Tiles" value="${this.playerState?.tiles.length}"></civ-label>
        `;
    }

}