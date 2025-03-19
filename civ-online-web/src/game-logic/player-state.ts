export class PlayerState {
    static gold: number;

    static toJSON(): string {
        return JSON.stringify(this.gold);
    }
}