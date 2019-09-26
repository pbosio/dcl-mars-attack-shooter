import utils from "../node_modules/decentraland-ecs-utils/index"
import { AIAlienController } from "./ai/aiAlienController";
import { Alien } from "./alien";
import { TriggerPosition } from "./ai/aiTriggers";
import { Config } from "./config";

export class AlienSpawner extends Entity {
    private static _instance: AlienSpawner = null

    public static get instance(): AlienSpawner {
        if (this._instance == null) {
            this._instance = new AlienSpawner();
            engine.addEntity(this._instance);
        }
        return this._instance;
    }

    public static create() {
        AlienSpawner.instance;
    }

    private alienControllers: AIAlienController[] = [];
    private availableAliens: Alien[] = [];

    public startSpawning() {
        this.spawnAlien();
        this.addComponent(new utils.Interval(Config.SPAWN_INTERVAL, () => this.spawnAlien()));
    }

    public stopSpawning() {
        this.removeComponent(utils.Interval);
        for (let i = 0; i < this.alienControllers.length; i++) {
            this.alienControllers[i].getAlien().destroy();
            this.alienControllers[i].clear();
        }
    }

    private constructor() {
        super();
        this.createAliens();
    }

    private createAliens() {
        for (let i = 0; i < Config.SPAWN_MAX_ALIENS; i++) {
            const alien = new Alien();
            this.alienControllers.push(new AIAlienController(alien));
            this.availableAliens.push(alien);
            alien.getComponent(Transform).position = new Vector3(16, -5, 16);
            alien.getComponent(utils.TriggerComponent).enabled = false;
            alien.playAnimation(Alien.Animation.idle);
            alien.name = "ALIEN" + i;
            engine.addEntity(alien);
        }
    }

    private spawnAlien() {
        if (this.availableAliens.length > 0) {
            const alien = this.availableAliens[0];
            this.availableAliens.splice(0, 1);
            alien.getComponent(Transform).position = TriggerPosition.upSpawnPoint;
            alien.getComponent(utils.TriggerComponent).enabled = true;
            alien.playAnimation(Alien.Animation.idle);
            alien.subscribeOnceToDie(() => {
                this.availableAliens.push(alien)
                alien.getComponent(Transform).position = new Vector3(16, -5, 16);
            });
        }
    }

    public getAlienController(alien: Alien): AIAlienController {
        for (let i = 0; i < this.alienControllers.length; i++) {
            if (this.alienControllers[i].getAlien() == alien) {
                return this.alienControllers[i];
            }
        }

        return null;
    }
}