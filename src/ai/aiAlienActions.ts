import utils from "../../node_modules/decentraland-ecs-utils/index"
import { ActionsSequenceSystem } from "../../node_modules/decentraland-ecs-utils/actionsSequenceSystem/actionsSequenceSystem";
import { Alien } from "../alien";
import { Random } from "../utils/random"

export namespace AlienActions {
    export class AlienAIActionBase implements ActionsSequenceSystem.IAction {
        protected alien: Alien | null;
        hasFinished: boolean;

        constructor(alien: Alien) {
            this.alien = alien;
            this.hasFinished = false
        }

        onStart(): void {
        }
        update(dt: number): void {
        }
        onFinish(): void {
        }
    }

    export class MoveToPosition extends AlienAIActionBase {
        private target: Vector3;

        constructor(alien: Alien, targetPosition: Vector3) {
            super(alien);
            this.target = targetPosition;
        }

        onStart() {
            this.hasFinished = false;
            const alienTransform = this.alien.getComponent(Transform);
            const alienPosition = alienTransform.position;
            const time = Vector3.Distance(alienPosition, this.target) / Alien.MOVE_SPEED;
            this.alien.playAnimation(Alien.Animation.run);
            alienTransform.lookAt(this.target);
            this.alien.addComponentOrReplace(new utils.MoveTransformComponent(alienPosition, this.target, time, () => {
                this.hasFinished = true;
                this.alien.playAnimation(Alien.Animation.idle);
            }));
        }
    }

    export class MoveThroughPath extends AlienAIActionBase {
        private path: Vector3[];
        private pathDuration: number;

        constructor(alien: Alien, path: Vector3[]) {
            super(alien);
            this.path = path;
            this.pathDuration = 0;
            for (let i = 1; i < this.path.length; i++) {
                this.pathDuration += Vector3.Distance(this.path[i - 1], this.path[i]) / Alien.MOVE_SPEED;
            }
        }

        onStart() {
            this.hasFinished = false;
            const alienTransform = this.alien.getComponent(Transform);
            const alienPosition = alienTransform.position;
            const time = (Vector3.Distance(alienPosition, this.path[0]) / Alien.MOVE_SPEED) + this.pathDuration;
            this.alien.playAnimation(Alien.Animation.run);
            alienTransform.lookAt(this.path[0]);
            this.alien.addComponentOrReplace(new utils.FollowPathComponent(this.path, time, () => {
                this.hasFinished = true;
                this.alien.playAnimation(Alien.Animation.idle);
            }, (currentPoint, nextPoint) => {
                alienTransform.lookAt(nextPoint);
            }));
        }
    }

    export class WaitSeconds extends AlienAIActionBase {
        private seconds: number;
        private currentSeconds: number;

        constructor(seconds: number) {
            super(null);
            this.seconds = seconds;
        }

        onStart() {
            this.hasFinished = false;
            this.currentSeconds = 0;
        }

        update(dt: number) {
            this.currentSeconds += dt;
            if (this.currentSeconds >= this.seconds) {
                this.hasFinished = true;
            }
        }
    }

    export class WaitRandomSeconds extends WaitSeconds {
        constructor(minSecs: number, maxSecs: number) {
            super(Random.FLOAT.range(minSecs, maxSecs));
        }
    }

    export class Attack extends AlienAIActionBase {
        constructor(alien: Alien) {
            super(alien);
        }

        onStart() {
            this.hasFinished = false;
            const alienTransform = this.alien.getComponent(Transform)
            const lookAtPosition = new Vector3(Camera.instance.position.x, alienTransform.position.y, Camera.instance.position.z);
            const rot = Quaternion.LookRotation((lookAtPosition.subtract(alienTransform.position)).normalize(), Vector3.Up());

            this.alien.addComponentOrReplace(new utils.RotateTransformComponent(alienTransform.rotation, rot, 0.5, () => {
                if (this.shouldShoot()) {
                    this.alien.shoot(Camera.instance.position);
                    this.hasFinished = true;
                }
                else {
                    this.alien.granade(Camera.instance.position);
                    this.hasFinished = true;
                }
            }));

        }

        private shouldShoot(): boolean {
            return Random.INT.max(100) >= 30;
        }
    }
}