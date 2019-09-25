export class GameManager {

    private static _instance: GameManager = null;

    public static get instance(): GameManager {
        if (this._instance == null) {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    public static create(onBattleStart: () => void, onBattleEnd: () => void) {
        this.instance.setCallbacks(onBattleStart, onBattleEnd);
    }

    private onBattleStart: () => void;
    private onBattleEnd: () => void;
    private alienKilled: number;
    private gameActive: boolean;

    public setCallbacks(onBattleStart: () => void, onBattleEnd: () => void) {
        this.onBattleStart = onBattleStart;
        this.onBattleEnd = onBattleEnd;
    }

    public setBattleStart() {
        this.gameActive = true;
        this.alienKilled = 0;
        if (this.onBattleStart) this.onBattleStart();
    }

    public setBattleEnd() {
        this.gameActive = false;
        if (this.onBattleEnd) this.onBattleEnd();
    }

    public setAlienKilled() {
        this.alienKilled++;
    }

    public getAlienKilled(): number{
        return this.alienKilled;
    }

    public isGameActive() {
        return this.gameActive;
    }

    private constructor() {
        this.gameActive = false;
    }
}