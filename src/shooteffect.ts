import utils from "../node_modules/decentraland-ecs-utils/index"
import { Random } from "./utils/random"

const TEXTURES = [
    new Texture("images/shooteffect/shooteffect1.png", { hasAlpha: true }),
    new Texture("images/shooteffect/shooteffect2.png", { hasAlpha: true }),
    new Texture("images/shooteffect/shooteffect3.png", { hasAlpha: true })]

export class ShootEffectManager {
    private static _instance: ShootEffectManager;

    public static create() {
        ShootEffectManager.instance;
    }

    private pool: ShootEffect[] = []

    public static get instance(): ShootEffectManager {
        if (this._instance == null) {
            this._instance = new ShootEffectManager();
        }
        return this._instance;
    }

    private constructor() {
    }

    public showEffect(position: Vector3, normal: Vector3) {
        this.getEffect().show(position, normal);
    }

    private onEffectDestroyed(effect: ShootEffect) {
        this.pool.push(effect);
    }

    private getEffect(): ShootEffect {
        if (this.pool.length > 0) {
            const ret = this.pool[0];
            this.pool.splice(0, 1);
            return ret;
        }
        const effect = new ShootEffect((e) => { this.onEffectDestroyed(e) });
        return effect;
    }
}

class ShootEffect extends Entity {
    private onDestroy: (self: ShootEffect) => void;
    private shape: Shape;
    private material: Material;
    private transform: Transform;

    constructor(onDestroy: (self: ShootEffect) => void) {
        super();
        this.onDestroy = onDestroy;
        this.shape = new PlaneShape();
        this.shape.withCollisions = false;
        this.addComponent(this.shape);
        this.transform = new Transform({ scale: new Vector3(0.25, 0.25, 0.25) });
        this.addComponent(this.transform);
        this.material = new Material();
        this.material.hasAlpha = true;
        this.material.emissiveColor = Color3.Purple();
        this.addComponent(this.material);
        engine.addEntity(this);
        this.shape.visible = false;
    }

    show(position: Vector3, normal: Vector3) {
        this.material.albedoTexture = TEXTURES[Random.INT.max(TEXTURES.length - 1)]
        this.transform.position = position;
        const randomAngle = Math.random() * 360;
        let rotation = Quaternion.LookRotation(normal, Vector3.Up())
        rotation.multiplyInPlace(Quaternion.RotationYawPitchRoll(0, 0, randomAngle));
        this.transform.rotation = rotation;
        this.shape.visible = true;
        this.addComponentOrReplace(new utils.Delay(100, () => {
            this.shape.visible = false;
            if (this.onDestroy) this.onDestroy(this);
        }))
    }
}