import { Player } from "./player";
import { ShootEffectManager } from "./shooteffect";
import { BulletManager } from "./bullet";
import { createCollisionMap } from "./collisions";
import { UpdateSystem, UpdatableComponent } from "./utils/updateSystem";
import { createAlienAIMap } from "./ai/aiTriggers";
import { AlienSpawner } from "./alienSpawner";
import { Turret } from "./turrets";

//loadGamePlay(turret_02, turret_02_2);
export function loadGamePlay(turretRight: Entity, turretLeft: Entity) {
    const dome = new Entity();
    dome.addComponent(new GLTFShape("models/Domo.glb"));
    engine.addEntity(dome);

    createCollisionMap();
    createAlienAIMap();

    UpdateSystem.create(); //One system to rule 'em all.

    new Turret(turretRight, 20);
    new Turret(turretLeft, -20);

    const player = new Player();
    player.pickRifle();

    ShootEffectManager.create();
    BulletManager.create(player);
    AlienSpawner.create();

    AlienSpawner.instance.startSpawning();

    const ambientSoundEntity = new Entity();
    const ambientSoundTransform = ambientSoundEntity.addComponent(new Transform());
    ambientSoundEntity.addComponent(new AudioSource(new AudioClip("sounds/environment.mp3")));
    ambientSoundEntity.getComponent(AudioSource).loop = true;
    ambientSoundEntity.getComponent(AudioSource).playing = true;
    ambientSoundEntity.addComponent(new UpdatableComponent(() => ambientSoundTransform.position = Camera.instance.position));
    engine.addEntity(ambientSoundEntity);
}