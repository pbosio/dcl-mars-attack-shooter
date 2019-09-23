import { Rifle } from "./rifle";
import { BulletManager, ShootTargetType } from "./bullet";
import { ShootEffectManager } from "./shooteffect";
import { UpdatableComponent } from "./utils/updateSystem";

export class Player extends Entity {

    private rifle: Rifle = null;
    private hasRifle: boolean = false;

    private playerLastPosition: Vector3

    private isPlayerMoving: boolean;

    constructor() {
        super();
        engine.addEntity(this);
        this.addComponent(new UpdatableComponent((dt) => this.update(dt)));

        this.playerLastPosition = Camera.instance.position;
        this.isPlayerMoving = false;

        Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, () => {
            if (this.hasRifle && this.rifle.canSetAimState()) {
                this.rifle.setAimState();
            }
        });
        Input.instance.subscribe("BUTTON_UP", ActionButton.SECONDARY, false, () => {
            if (this.hasRifle && this.rifle.canSetIdleState()) {
                this.rifle.setIdleState();
            }
        });
        Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, () => {
            if (this.canShoot()) {
                const shootSource = this.rifle.getBulletSourcePosition();
                const shootDirection = this.rifle.getAimDirection();
                BulletManager.instance.shoot(shootSource, shootDirection, ShootTargetType.Alien);
                ShootEffectManager.instance.showEffect(shootSource, shootDirection);
            }
        });
    }

    public pickRifle() {
        if (!this.hasRifle) {
            if (this.rifle == null) {
                this.rifle = new Rifle();
                engine.addEntity(this.rifle);
            }
            this.hasRifle = true;
            this.rifle.setIdleState();
        }
    }

    public die() {
        
    }

    public update(dt: number) {
        if (this.hasRifle) {
            this.updateRifleRootPosition(dt);
        }

        const cameraPosition = Camera.instance.position;

        if (this.hasPlayerMoved(cameraPosition)) {
            if (!this.isPlayerMoving) {
                this.isPlayerMoving = true;
                this.onPlayerMoveStart();
            }
        }
        else {
            if (this.isPlayerMoving) {
                this.isPlayerMoving = false;
                this.onPlayerIdleStart()
            }
        }
        this.playerLastPosition = cameraPosition.clone();
    }

    private canShoot(): boolean {
        if (this.hasRifle) {
            return this.rifle.canShoot();
        }
        return false;
    }

    private onPlayerMoveStart() {
        if (this.hasRifle) {
            this.rifle.setMoveState();
        }
    }

    private onPlayerIdleStart() {
        if (this.hasRifle) {
            this.rifle.setIdleState();
        }
    }

    private hasPlayerMoved(cameraPosition: Vector3): boolean {
        return this.playerLastPosition.x !== cameraPosition.x
            || this.playerLastPosition.y !== cameraPosition.y
            || this.playerLastPosition.z !== cameraPosition.z
    }

    private updateRifleRootPosition(dt: number) {
        const rifleTransform = this.rifle.getComponent(Transform);

        const camForward = Vector3.Forward().rotate(Camera.instance.rotation);

        const rifleCurrentPosition = rifleTransform.position;
        const rifleTargetPosition = Camera.instance.position.add(camForward.scale(0.1));
        const rifleNewPosition = Vector3.Lerp(rifleCurrentPosition, rifleTargetPosition, 10 * dt);

        rifleTransform.position = rifleNewPosition;

        const rifleCurrentRotation = rifleTransform.rotation;
        const rifleTargetRotation = Quaternion.LookRotation(camForward, Vector3.Up().rotate(Camera.instance.rotation));
        const rifleNewRotation = Quaternion.Slerp(rifleCurrentRotation, rifleTargetRotation, 8 * dt);

        rifleTransform.rotation = rifleNewRotation;
    }
}