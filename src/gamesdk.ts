import { Player } from "./player";
import { ShootEffectManager } from "./shooteffect";
import { BulletManager } from "./bullet";
import { createCollisionMap } from "./collisions";
import { UpdateSystem, UpdatableComponent } from "./utils/updateSystem";
import { Alien } from "./alien";
import { createAlienAIMap } from "./ai/aiTriggers";
import { AlienSpawner } from "./alienSpawner";

export function loadGamePlay() {
    const dome = new Entity();
    dome.addComponent(new GLTFShape("models/Domo.glb"));
    engine.addEntity(dome);

    createCollisionMap();
    createAlienAIMap();

    UpdateSystem.create(); //One system to rule 'em all.

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