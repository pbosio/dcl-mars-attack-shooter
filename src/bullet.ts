import utils from "../node_modules/decentraland-ecs-utils/index"

const BULLET_SPEED: number = 5;
const BULLET_GLTF = new GLTFShape("models/laserbullet.glb");

export class BulletManager {
    private pool: Bullet[] = []

    private static _instance: BulletManager = null;

    public static get instance(): BulletManager {
        if (this._instance == null) this._instance = new BulletManager();
        return this._instance;
    }

    private constructor() {
        engine.addSystem(new BulletSystem());
    }

    public shoot(from: Vector3, direction: Vector3) {
        const bullet = this.getBullet();
        const bulletTransform = bullet.getComponent(Transform);
        bulletTransform.position = from;
        bulletTransform.lookAt(from.add(direction));
        bullet.shoot(direction);
        //engine.addEntity(bullet);
    }

    private onBulletDestroyed(bullet: Bullet) {
        this.pool.push(bullet);
        //removing entity from engine has some unwanted behaviors
        //engine.removeEntity(bullet);
        bullet.setGlobalPosition(new Vector3(2, -1, 0))
    }

    private getBullet(): Bullet {
        if (this.pool.length > 0) {
            const ret = this.pool[0];
            this.pool.splice(0, 1);
            return ret;
        }
        const bullet = new Bullet((b) => { this.onBulletDestroyed(b) });
        bullet.addComponent(new Transform({ scale: new Vector3(0.3, 0.3, 0.3) }));
        bullet.addComponent(BULLET_GLTF);
        engine.addEntity(bullet);

        return bullet;
    }
}

class Bullet extends Entity {
    private onDestroyed: (bullet: Bullet) => void

    constructor(onDestroyed: (bullet: Bullet) => void) {
        super()
        this.onDestroyed = onDestroyed;
    }

    public shoot(direction: Vector3) {
        this.addComponentOrReplace(new BulletComponent(direction))
        this.addComponent(new utils.Delay(3000, () => {
            this.destroy();
        }))
    }

    public destroy() {
        this.removeComponent(BulletComponent);
        if (this.onDestroyed) this.onDestroyed(this);
    }
}

class BulletSystem implements ISystem {
    public update(dt: number) {
        const liveBullets = engine.getComponentGroup(BulletComponent, Transform)

        liveBullets.entities.forEach(bullet => {
            const bulletTransform = bullet.getComponent(Transform);
            bulletTransform.position = bulletTransform.position.add(bullet.getComponent(BulletComponent).direction.scale(dt * BULLET_SPEED));
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