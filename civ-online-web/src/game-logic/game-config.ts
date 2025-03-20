export class GameConfig {
    private static _gameId = "";
    private static _playerId = "";
    private static _opponentId = "";

    static get gameId(): string {
        return this._gameId;
    }

    static set gameId(value: string) {
        this._gameId = value;
        this.notifyChange();
    }

    static get playerId(): string {
        return this._playerId;
    }

    static set playerId(value: string) {
        this._playerId = value;
        this.notifyChange();
    }

    static get opponentId(): string {
        return this._opponentId;
    }

    static set opponentId(value: string) {
        this._opponentId = value;
        this.notifyChange();
    }

    static reset() {
        this._gameId = "";
        this._playerId = "";
        this._opponentId = "";

        this.notifyChange();
    }

    static notifyChange() {
        const event = new CustomEvent('game-config-changed');
        window.dispatchEvent(event);
    }
}