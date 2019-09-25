import "./extensions/transformExtension"
import utils from "../node_modules/decentraland-ecs-utils/index"
import { layerTurretTrigger } from "./collisions";
import { RotateTransformComponent } from "../node_modules/decentraland-ecs-utils/transform/component/rotate";
import { UpdatableComponent } from "./utils/updateSystem";
import { BulletManager, ShootTargetType } from "./bullet";
import { ShootEffectManager } from "./shooteffect";

export class Turret {
    private turretEntity: Entity;
    private triggerEntity: Entity;
    private defaultRotation: Quaternion;

    public constructor(turretEntity: Entity, rotationAngle: number) {
        this.turretEntity = turretEntity;
        this.defaultRotation = turretEntity.getComponent(Transform).rotation;

        const trigger = new Entity();
        const triggerTransform = trigger.addComponent(new Transform({ position: new Vector3(0, 0, 20) }));
        trigger.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.5, 2, 15), Vector3.Zero()), layerTurretTrigger));
        
        trigger.addComponent(new UpdatableComponent((dt) => {
            const turretTransform = turretEntity.getComponent(Transform);
            const targetPosition = turretTransform.position.add(turretTransform.Forward().scale(15));
            triggerTransform.position = Vector3.Lerp(triggerTransform.position, targetPosition, dt * 10);
        }))
        engine.addEntity(trigger);

        this.triggerEntity = trigger;
        this.rotate(rotationAngle);
        this.setActive(false);
    }

    public setActive(active: boolean){
        if (active){
            this.triggerEntity.getComponent(utils.TriggerComponent).onCameraEnter = ()=> this.onTriggerEnter();
        }
        else{
            this.triggerEntity.getComponent(utils.TriggerComponent).onCameraEnter = null;
        }
    }

    private onTriggerEnter() {
        this.shoot();
    }

    private rotate(angle: number) {
        const turretTransform = this.turretEntity.getComponent(Transform);
        this.turretEntity.addComponentOrReplace(new RotateTransformComponent(turretTransform.rotation,
            turretTransform.rotation.multiply(Quaternion.Euler(0, angle, 0)), 5,
            () => {
                this.turretEntity.addComponentOrReplace(new utils.Delay(1000, () => {
                    this.rotateToCenter(() => this.rotate(angle));
                }));
            }, utils.InterpolationType.EASEQUAD));
    }

    private rotateToCenter(callNextRotation: () => void) {
        const turretTransform = this.turretEntity.getComponent(Transform);
        this.turretEntity.addComponentOrReplace(new RotateTransformComponent(turretTransform.rotation,
            this.defaultRotation, 5,
            () => {
                this.turretEntity.addComponentOrReplace(new utils.Delay(1000, () => {
                    callNextRotation();
                }));
            }, utils.InterpolationType.EASEQUAD));
    }

    private shoot() {
        const turretTransform = this.turretEntity.getComponent(Transform);
        const turretPosition = turretTransform.position;
        const turretForward = turretTransform.Forward();

        const offsetForward = turretForward.scale(2.471);
        const offsetUp = turretTransform.Up().scale(0.65);
        const offsetRight = turretTransform.Right().scale(1.052);

        const source1 = turretPosition.add(offsetForward).add(offsetUp).add(offsetRight);
        const source2 = turretPosition.add(offsetForward).add(offsetUp).subtract(offsetRight);

        BulletManager.instance.shoot(source1, turretForward, ShootTargetType.Player);
        ShootEffectManager.instance.showEffect(source1, turretForward);
        this.triggerEntity.addComponentOrReplace(new utils.Delay(500, () => {
            const turretForward = turretTransform.Forward();
            BulletManager.instance.shoot(source2, turretForward, ShootTargetType.Player);
            ShootEffectManager.instance.showEffect(source2, turretForward);
        }));
    }
}