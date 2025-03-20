export class PlayerState {
    private static _gold: number = 0;

    static get gold(): number {
        return this._gold;
    }

    static set gold(value: number) {
        this._gold = value;
        this.notifyChange();
    }

    static toJSON(): string {
        return JSON.stringify({ gold: this._gold });
    }

    static notifyChange() {
        const event = new CustomEvent('player-state-changed');
        window.dispatchEvent(event);
    }
}