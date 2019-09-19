import { Player } from "./player";
import { ShootEffectManager } from "./shooteffect";
import { BulletManager } from "./bullet";

export function loadGamePlay() {
    const player = new Player();
    player.pickRifle();

    ShootEffectManager.create();
    BulletManager.create();
}