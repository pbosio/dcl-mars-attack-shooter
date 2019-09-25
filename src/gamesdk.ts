import utils from "../node_modules/decentraland-ecs-utils/index"

import { Player } from "./player";
import { ShootEffectManager } from "./shooteffect";
import { BulletManager } from "./bullet";
import { createCollisionMap } from "./collisions";
import { UpdateSystem, UpdatableComponent } from "./utils/updateSystem";
import { createAlienAIMap } from "./ai/aiTriggers";
import { AlienSpawner } from "./alienSpawner";
import { Turret } from "./turrets";
import { GameManager } from "./gameManager";
import { RIFLE_GLTF_SHAPE } from "./rifle";

//loadGamePlay(turret_02, turret_02_2);
export function loadGamePlay(turretRight: Entity, turretLeft: Entity) {

    const dome = new Entity();
    dome.addComponent(new GLTFShape("models/Domo.glb"));
    engine.addEntity(dome);

    createCollisionMap();
    createAlienAIMap();

    UpdateSystem.create(); //One system to rule 'em all.

    const turrets: Turret[] = [new Turret(turretRight, 20), new Turret(turretLeft, -20)];

    const player = new Player();

    ShootEffectManager.create();
    BulletManager.create(player);
    //AlienSpawner.create();

    const ambientAudioSource = new AudioSource(new AudioClip("sounds/environment.mp3"));
    ambientAudioSource.loop = true;
    ambientAudioSource.playing = true;

    const battleAudioSource = new AudioSource(new AudioClip("sounds/serge-narcissoff-dark-knight.mp3"));
    battleAudioSource.loop = true;
    battleAudioSource.playing = false;

    const ambientSoundEntity = new Entity();
    const ambientSoundTransform = ambientSoundEntity.addComponent(new Transform());
    ambientSoundEntity.addComponent(ambientAudioSource);
    ambientSoundEntity.addComponent(new UpdatableComponent(() => ambientSoundTransform.position = Camera.instance.position));
    engine.addEntity(ambientSoundEntity);

    const rifle = new Entity();
    rifle.addComponent(new GLTFShape("models/rifle.glb"));
    rifle.addComponent(new Transform({ position: new Vector3(2, 0.342, 2.521), rotation: Quaternion.Euler(0, 85.65, 93.94), scale: new Vector3(2, 2, 2) }));
    rifle.addComponent(new OnClick(() => {
        GameManager.instance.setBattleStart();
        message.value = "[PRESS [F] FOR A BETTER AIM]";
        rifle.addComponent(new utils.Delay(10000, ()=>{
            message.value = "";
        }));
    }));
    engine.addEntity(rifle);

    const startSpawn = () => {
        AlienSpawner.instance.startSpawning();
    }

    const gameUI = new UICanvas();
    const message = new UIText(gameUI);
    message.vAlign = "bottom";
    message.hTextAlign = "center"
    message.positionY = "10%";
    message.value = "[PICK UP YOUR RIFLE AND ATTACK]";
    message.fontSize = 20;

    GameManager.create(
        () => {
            rifle.getComponent(GLTFShape).visible = false;
            ambientAudioSource.playing = false;
            battleAudioSource.playing = true;
            ambientSoundEntity.addComponentOrReplace(battleAudioSource);
            player.pickRifle();
            startSpawn();
            turrets.forEach(turret => {
                turret.setActive(true);
            });
        },
        () => {
            ambientAudioSource.playing = true;
            battleAudioSource.playing = false;
            ambientSoundEntity.addComponentOrReplace(ambientAudioSource);
            rifle.getComponent(GLTFShape).visible = true;
            player.removeRifle();
            AlienSpawner.instance.stopSpawning();
            turrets.forEach(turret => {
                turret.setActive(false);
            });
            if (rifle.hasComponent(utils.Delay)) rifle.removeComponent(utils.Delay);
            message.value = "[KILLED "+GameManager.instance.getAlienKilled()+" ALIENS]";
        });
    //GameManager.instance.setBattleStart();
}