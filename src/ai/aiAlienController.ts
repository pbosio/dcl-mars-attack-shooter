import { ActionsSequenceSystem } from "../../node_modules/decentraland-ecs-utils/actionsSequenceSystem/actionsSequenceSystem";
import { Alien } from "../alien";
import { UpdateSystem } from "../utils/updateSystem";

export class AIAlienController {
    private actionSequencer: ActionsSequenceSystem;
    private ordersQueue: ActionsSequenceSystem.SequenceBuilder[] = [];
    private alien: Alien;

    public constructor(alien: Alien) {
        this.alien = alien;
        this.alien.setOnDieCallback(() => this.onAlienDie());

        this.actionSequencer = new ActionsSequenceSystem();
        this.actionSequencer.setOnFinishCallback(() => {
            if (this.ordersQueue.length > 0) {
                this.actionSequencer.startSequence(this.ordersQueue[0]);
                this.ordersQueue.splice(0, 1);
            }
        });
        UpdateSystem.addSystem(this.actionSequencer);
    }

    public clear() {
        this.actionSequencer.stop();
        this.ordersQueue = []; 
    }

    public receiveOrders(ordersSequence: ActionsSequenceSystem.SequenceBuilder) {
        if (this.canObeyOrders()) {
            this.actionSequencer.startSequence(ordersSequence);
        }
        else {
            this.ordersQueue.push(ordersSequence);
        }
    }

    public canObeyOrders(): boolean {
        return !this.actionSequencer.isRunning();
    }

    public getAlien(): Alien {
        return this.alien;
    }

    private onAlienDie() {
        this.clear();
    }

}