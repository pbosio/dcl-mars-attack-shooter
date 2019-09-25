import { TransformSystem } from "../../node_modules/decentraland-ecs-utils/transform/system/transfromSystem";
import { TimerSystem } from "../../node_modules/decentraland-ecs-utils/timer/system/timerSystem";
import { TriggerSystem } from "../../node_modules/decentraland-ecs-utils/triggers/triggerSystem";

/*
Let's try to merge all systems in here. 
One system to rule 'em all. 
Then if there is time we can do funny things like playing with delta time.
*/
export class UpdateSystem implements ISystem {
    private static instance: UpdateSystem;

    public static create() {
        if (this.instance == null) {
            this.instance = new UpdateSystem();
        }
    }

    public static addSystem(system: ISystem) {
        this.create();
        this.instance.systems.push(system);
    }

    public static removeSystem(system: ISystem) {
        const idx = this.instance.systems.indexOf(system);
        if (idx >= 0) {
            this.instance.systems.splice(idx, 1);
        }
    }

    private systems: ISystem[] = []

    private constructor() {
        const transformSystem = TransformSystem.createAndAddToEngine();
        engine.removeSystem(transformSystem);
        this.systems.push(transformSystem);

        const timerSystem = TimerSystem.createAndAddToEngine();
        engine.removeSystem(timerSystem);
        this.systems.push(timerSystem);

        const triggerSystem = TriggerSystem.createAndAddToEngine()
        engine.removeSystem(triggerSystem);
        this.systems.push(triggerSystem);

        engine.addSystem(this);
    }

    public update(dt: number) {
        this.systems.forEach(system => {
            system.update(dt);
        });

        const updatableEntities = engine.getComponentGroup(UpdatableComponent).entities;
        updatableEntities.forEach(entity => {
            entity.getComponent(UpdatableComponent).update(dt);
        });
    }

}

@Component("UpdatableComponent")
export class UpdatableComponent {
    public onUpdate: (dt: number) => void;

    public constructor(onUpdate: (dt: number) => void) {
        this.onUpdate = onUpdate;
    }

    public update(dt: number) {
        if (this.onUpdate) this.onUpdate(dt);
    }
}