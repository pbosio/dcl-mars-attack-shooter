import { Player } from "./player";
import { ShootEffectManager } from "./shooteffect";
import { BulletManager } from "./bullet";
import { createCollisionMap } from "./collisions";

export function loadGamePlay() {
    const dome = new Entity();
    dome.addComponent(new GLTFShape("models/Domo.glb"));
    engine.addEntity(dome);

    createCollisionMap();

    const player = new Player();
    player.pickRifle();

    ShootEffectManager.create();
    BulletManager.create();
}