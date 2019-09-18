import { Player } from "./player";

const player = new Player();
player.pickRifle();

const bullet = new Entity()
bullet.addComponent(new GLTFShape("models/laserbullet.glb"))
bullet.addComponent(new Transform({position: new Vector3(1,1,1)}))
engine.addEntity(bullet)