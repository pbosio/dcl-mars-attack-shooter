import "./extensions/transformExtension";
import "./extensions/entityExtension"

import utils from "../node_modules/decentraland-ecs-utils/index"

import { StateMachine } from "./utils/stateMachine";
import { UpdateSystem } from "./utils/updateSystem";

enum RifleState { Hidden, IdleStart, Idle, AimmingStart, Aimming }

export class Rifle extends Entity {

    private rifleEntity: Entity;
    private stateMachine: StateMachine;
    private state: RifleState;

    constructor() {
        super();

        this.rifleEntity = new Entity();
        this.rifleEntity.addComponent(new GLTFShape("models/rifle.glb"));
        this.rifleEntity.addComponent(new Transform());
        this.rifleEntity.setParent(this);

        this.addComponent(new Transform());

        this.stateMachine = new StateMachine();
        UpdateSystem.addSystem(this.stateMachine);

        this.state = RifleState.Hidden;
    }

    public setMoveState() {
        this.stateMachine.setState(new GenericState(
            () => {
                this.rifleEntity.getComponent(GLTFShape).visible = false;
                this.state = RifleState.Hidden;
            }
        ));
    }

    public setIdleState() {
        this.stateMachine.setState(new GenericState(
            () => {
                const rifleTransform = this.rifleEntity.getComponent(Transform);
                rifleTransform.rotation = Quaternion.Identity;
                this.state = RifleState.IdleStart;
                this.rifleEntity.addComponentOrReplace(new utils.Delay(200, () => {
                    this.rifleEntity.getComponent(GLTFShape).visible = true;
                    this.rifleEntity.addComponentOrReplace(new utils.MoveTransformComponent(rifleTransform.position, new Vector3(0.1, -0.09, 0), 0.5,
                        () => {
                            this.state = RifleState.Idle;
                        }));
                }));
            }
        ));
    }

    public setAimState() {
        this.stateMachine.setState(new GenericState(
            () => {
                const rifleTransform = this.rifleEntity.getComponent(Transform);
                rifleTransform.rotation = Quaternion.Euler(-3.156, 0.002, 0);
                this.state = RifleState.AimmingStart;
                this.rifleEntity.addComponentOrReplace(new utils.Delay(200, () => {
                    this.rifleEntity.getComponent(GLTFShape).visible = true;
                    this.rifleEntity.addComponentOrReplace(new utils.MoveTransformComponent(rifleTransform.position, new Vector3(-0.001002297, -0.0406114, -0.09021578), 0.2,
                        () => {
                            this.state = RifleState.Aimming;
                        }));
                }));
            }
        ));
    }

    public canSetAimState(): boolean {
        return this.state === RifleState.IdleStart || this.state === RifleState.Idle;
    }

    public canSetIdleState(): boolean {
        return this.state === RifleState.Aimming || this.state === RifleState.AimmingStart;
    }

    public canShoot(): boolean {
        return this.state === RifleState.Aimming || this.state === RifleState.Idle;
    }

    public getBulletSourcePosition(): Vector3 {
        const forwardOffset = 0.32;

        if (this.state == RifleState.Aimming) {
            const up = Vector3.Up().rotate(Camera.instance.rotation).scale(-0.01);
            const forward = Vector3.Forward().rotate(Camera.instance.rotation).scale(forwardOffset);
            return Camera.instance.position.add(forward);
        }
        else {
            const up = this.rifleEntity.globalUp().scale(0.01);
            const forward = this.rifleEntity.globalForward().scale(forwardOffset);
            return this.rifleEntity.getGlobalPosition().add(forward.add(up));
        }
    }

    public getAimDirection(): Vector3 {
        if (this.state == RifleState.Aimming) {
            return Vector3.Forward().rotate(Camera.instance.rotation);
        }
        else {
            return this.rifleEntity.globalForward();
        }
    }
}

class GenericState implements StateMachine.IState {
    private onStart?: (self: GenericState) => void;
    private onFinish?: (self: GenericState) => void;

    private finished: boolean = false;

    constructor(onStart?: (self: GenericState) => void, onFinish?: (self: GenericState) => void) {
        this.onStart = onStart;
        this.onFinish = onFinish;
    }

    setFinish(value: boolean) {
        this.finished = value;
    }

    start(): void {
        if (this.onStart) this.onStart(this);
    }

    finish(): void {
        if (this.onFinish) this.onFinish(this);
    }

    hasFinish(): boolean {
        return this.finished;
    }
}