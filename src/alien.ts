import "./extensions/entityExtension"
import utils from "../node_modules/decentraland-ecs-utils/index"
import { layerAliens } from "./collisions";
import { ShootEffectManager } from "./shooteffect";
import { BulletManager, ShootTargetType } from "./bullet";

const ALIEN_GLTF = new GLTFShape("models/Alien.glb");
const SHOOT_SOURCE = new Vector3(0.2, 1.5, 1.65);

export class Alien extends Entity {
    public static readonly MOVE_SPEED = 5;

    private animator: Animator;
    private currentAnimClip: AnimationState | null;
    private onDie: () => void;

    private onDieOnce: (() => void)[] = []

    public constructor() {
        super();
        this.addComponent(new Transform({ scale: new Vector3(1.5, 1.5, 1.5), position: new Vector3(5, 0, 5) }))
        this.addComponent(ALIEN_GLTF);

        const trigger = new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(0.8, 1.3, 0.8), new Vector3(0, 1.3, 0.2)), layerAliens);
        this.addComponent(trigger);

        this.animator = new Animator();
        this.animator.addClip(new AnimationState(Alien.Animation.run, { looping: true }));
        this.animator.addClip(new AnimationState(Alien.Animation.shoot, { looping: false }));
        this.animator.addClip(new AnimationState(Alien.Animation.granade, { looping: false }));
        this.animator.addClip(new AnimationState(Alien.Animation.die, { looping: false }));
        this.addComponent(this.animator);

        this.playAnimation(Alien.Animation.idle);
    }

    public setOnDieCallback(onDie: () => void) {
        this.onDie = onDie;
    }

    public die() {
        if (this.onDie != null) this.onDie();
        this.getComponent(utils.TriggerComponent).enabled = false;
        this.playAnimation(Alien.Animation.die);
        this.addComponent(new utils.ExpireIn(3000, ()=> {
            for (let i=0; i< this.onDieOnce.length; i++){
                this.onDieOnce[i]();
            }
            this.onDieOnce = [];
        }));
    }

    public subscribeOnceToDie(onDie: ()=> void) {
        this.onDieOnce.push(onDie);
    }

    public setTriggerEnable(value: boolean) {
        this.getComponent(utils.TriggerComponent).enabled = value;
    }

    public playAnimation(animation: Alien.Animation) {
        if (this.currentAnimClip != null) {
            this.currentAnimClip.stop();
        }
        this.currentAnimClip = this.animator.getClip(animation);
        this.currentAnimClip.play();
    }

    public shoot(position: Vector3) {
        this.playAnimation(Alien.Animation.shoot);

        this.addComponentOrReplace(new utils.Delay(100, () => {
            const alienTransform = this.getComponent(Transform);

            let shootSource = alienTransform.position;
            shootSource = shootSource.add(alienTransform.Right().scale(SHOOT_SOURCE.x));
            shootSource = shootSource.add(alienTransform.Up().scale(SHOOT_SOURCE.y));
            shootSource = shootSource.add(alienTransform.Forward().scale(SHOOT_SOURCE.z));

            const direction = position.subtract(shootSource).normalize();

            BulletManager.instance.shoot(shootSource, direction, ShootTargetType.Player);
            ShootEffectManager.instance.showEffect(shootSource, alienTransform.Forward());
        }));
    }

    public granade(position: Vector3) {
        this.shoot(position);
    }
}

export namespace Alien {
    export enum Animation {
        run = "run",
        shoot = "shoot",
        granade = "granade",
        die = "die",
        idle = "shoot"
    }
}