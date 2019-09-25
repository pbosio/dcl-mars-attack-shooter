import utils from "../node_modules/decentraland-ecs-utils/index"
import { layerBullet, layerBulletBarrier, layerAliens } from "./collisions";
import { UpdateSystem } from "./utils/updateSystem";
import { Alien } from "./alien";
import { Player } from "./player";
import { Config } from "./config";

const BULLET_GLTF = new GLTFShape("models/laserbullet.glb");
const DEFAULT_COLLISION_LAYER = layerBulletBarrier;
const SHOOT_SOUND = new AudioClip("sounds/laser_shoot.mp3");

export enum ShootTargetType { Hostile, Player };

export class BulletManager {
    private pool: Bullet[] = []

    private static _instance: BulletManager = null;

    private player: Player;

    public static create(player: Player) {
        BulletManager.instance.player = player; 
    }

    public static get instance(): BulletManager {
        if (this._instance == null) this._instance = new BulletManager();
        return this._instance;
    }

    private constructor() {
        UpdateSystem.addSystem(new BulletSystem());
        //let's start with some bullets already created
        const bullets = [this.getBullet(), this.getBullet(), this.getBullet(), this.getBullet(),
        this.getBullet(), this.getBullet(), this.getBullet(), this.getBullet()];

        bullets.forEach(bullet => {
            this.hideBullet(bullet);
            this.pool.push(bullet);
        });
    }

    public shoot(from: Vector3, direction: Vector3, targetType: ShootTargetType) {
        const bullet = this.getBullet();
        const bulletTransform = bullet.getComponent(Transform);
        bulletTransform.position = from;
        bulletTransform.lookAt(from.add(direction));
        bullet.shoot(direction);
        const bulletTrigger = bullet.getComponent(utils.TriggerComponent); 
        switch (targetType){
            case ShootTargetType.Hostile:
                    bulletTrigger.triggeredByLayer = DEFAULT_COLLISION_LAYER | layerAliens;
                    bulletTrigger.onCameraEnter = null;
                break;
            case ShootTargetType.Player:
                    bulletTrigger.triggeredByLayer = DEFAULT_COLLISION_LAYER;
                    bulletTrigger.onCameraEnter = () => {
                        this.player.die();
                    };
                break;
        }
    }

    private onBulletDestroyed(bullet: Bullet) {
        this.pool.push(bullet);
        //removing entity from engine and adding it later has some unwanted behaviors
        this.hideBullet(bullet);
    }

    private hideBullet(bullet: Bullet) {
        bullet.setGlobalPosition(new Vector3(2, -1, 0))
    }

    private getBullet(): Bullet {
        if (this.pool.length > 0) {
            const ret = this.pool[0];
            this.pool.splice(0, 1);
            return ret;
        }
        const bullet = new Bullet((b) => { this.onBulletDestroyed(b) });
        engine.addEntity(bullet);

        return bullet;
    }
}

class Bullet extends Entity {
    private onDestroyed: (bullet: Bullet) => void

    constructor(onDestroyed: (bullet: Bullet) => void) {
        super()
        this.onDestroyed = onDestroyed;
        this.addComponent(new Transform({ scale: new Vector3(0.3, 0.3, 0.3) }));
        this.addComponent(BULLET_GLTF);
        this.addComponent(new AudioSource(SHOOT_SOUND));
        this.addComponent(new utils.TriggerComponent(new utils.TriggerSphereShape(0.2, Vector3.Zero()), layerBullet, DEFAULT_COLLISION_LAYER, (entity) => {
            this.destroy();
            if (entity instanceof Alien) {
                const alien = entity as Alien;
                alien.die();
            }
        }));
    }

    public shoot(direction: Vector3) {
        this.addComponentOrReplace(new BulletComponent(direction));
        this.addComponentOrReplace(new utils.Delay(8000, () => {
            this.destroy(true);
        }))
        this.getComponent(utils.TriggerComponent).enabled = true;
        this.getComponent(AudioSource).playOnce();
    }

    public destroy(destroyFromTimer: boolean = false) {
        this.removeComponent(BulletComponent);
        if (!destroyFromTimer && this.hasComponent(utils.Delay)) {
            this.removeComponent(utils.Delay);
        }
        this.getComponent(utils.TriggerComponent).enabled = false;
        if (this.onDestroyed) this.onDestroyed(this);
    }
}

class BulletSystem implements ISystem {
    public update(dt: number) {
        const liveBullets = engine.getComponentGroup(BulletComponent, Transform);

        liveBullets.entities.forEach(bullet => {
            const bulletTransform = bullet.getComponent(Transform);
            bulletTransform.position = bulletTransform.position.add(bullet.getComponent(BulletComponent).direction.scale(dt * Config.BULLET_SPEED));
        });
    }
}

@Component("bullet")
class BulletComponent {
    direction: Vector3

    constructor(direction: Vector3) {
        this.direction = direction;
    }
}