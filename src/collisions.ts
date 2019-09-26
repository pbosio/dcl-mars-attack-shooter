import utils from "../node_modules/decentraland-ecs-utils/index"

export const layerBulletBarrier = 1;
export const layerBullet = 1 << 1;
export const layerAIDecisionTrigger = 1 << 2;
export const layerAliens = 1 << 3;
export const layerTurretTrigger = 1 << 4;

export function createCollisionMap() {
    createBulletStopper(new Vector3(3.45, 1, 0.34), new Vector3(2.57, 0.62, 3.02));
    createBulletStopper(new Vector3(0.36, 1, 2.11), new Vector3(6.509, 0.6, 1.5));
    createBulletStopper(new Vector3(1, 1, 1), new Vector3(4.02, 0.49, 15.35));
    createBulletStopper(new Vector3(1.63, 1, 1.78), new Vector3(21.11, 0.49, 7.51));
    createBulletStopper(new Vector3(0.5, 2.52, 0.5), new Vector3(21.43, 1.31, 21.58));
    createBulletStopper(new Vector3(0.5, 2.52, 0.5), new Vector3(11, 1.31, 21.58));
    createBulletStopper(new Vector3(2.5, 2.5, 2.5), new Vector3(5.66, 0.97, 29.2));
    createBulletStopper(new Vector3(2.5, 2.5, 2.5), new Vector3(25.08, 0.97, 29.2));
    createBulletStopper(new Vector3(2.5, 2.81, 0.79), new Vector3(27.97, 5.35, 36.94));
    createBulletStopper(new Vector3(1.96, 1.5, 0.79), new Vector3(12.98, 4.71, 31.95));
    createBulletStopper(new Vector3(1.96, 0.88, 0.79), new Vector3(17.55, 4.47, 31.95));
    createBulletStopper(new Vector3(1.06, 0.88, 0.79), new Vector3(5.95, 4.28, 36.5));
    createBulletStopper(new Vector3(1.06, 0.88, 0.79), new Vector3(2.54, 4.28, 36.5));
    createBulletStopper(new Vector3(3, 3, 1), new Vector3(15.66885, 5.59, 37.91));

    createPlayerStopper(new Vector3(32, 4, 1), new Vector3(16, 2.07, 23.07));
    createPlayerStopper(new Vector3(32, 4, 1), new Vector3(16, 2.07, 47.36));
    createPlayerStopper(new Vector3(1, 4, 25), new Vector3(31.27, 2.07, 35.27));
    createPlayerStopper(new Vector3(1, 4, 25), new Vector3(0.66, 2.07, 35.27));
}

function createBulletStopper(size: Vector3, position: Vector3, debug?: boolean) {
    const collider = new Entity()
    collider.addComponent(new Transform({ position: position }));
    collider.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(size, Vector3.Zero()), layerBulletBarrier, null, null, null, null, null, debug));
    engine.addEntity(collider);
}

function createPlayerStopper(size: Vector3, position: Vector3, debug?: boolean) {
    const collider = new Entity();
    const shape = new BoxShape();
    shape.visible = debug ? true : false;
    collider.addComponent(shape);
    collider.addComponent(new Transform({ position: position, scale: size }));
    engine.addEntity(collider);
}