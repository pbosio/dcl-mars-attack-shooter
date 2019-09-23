import utils from "../../node_modules/decentraland-ecs-utils/index"
import { ActionsSequenceSystem } from "../../node_modules/decentraland-ecs-utils/actionsSequenceSystem/actionsSequenceSystem";
import { layerAIDecisionTrigger, layerAliens } from "../collisions";
import { Alien } from "../alien";
import { AlienActions } from "./aiAlienActions";
import { Random } from "../utils/random";
import { AlienSpawner } from "../alienSpawner";
import { Config } from "../config";

export class TriggerPosition {
    static readonly upSpawnPoint = new Vector3(15.6, 4.15, 43.2)
    static readonly upLocationChooser = new Vector3(15.6, 4.15, 38.05)
    static readonly upperShootingPositions = [
        new Vector3(2.5, 3.72, 37.12),
        new Vector3(5.96, 3.72, 37.208),
        new Vector3(13.05, 4.15, 33.49),
        new Vector3(17.64, 4.15, 32.949),
        new Vector3(27.94, 3.72, 37.867)
    ];
}

let aiTriggers: AIAlienDecisionTrigger[] = []

export function createAlienAIMap() {
    aiTriggers.push(new AIAlienDecisionTrigger(TriggerPosition.upSpawnPoint, new Vector3(2, 2, 2), UpperSpawnPointInstruction)); //upSpawnPoint
    aiTriggers.push(new AIAlienDecisionTrigger(TriggerPosition.upLocationChooser, new Vector3(2, 2, 2), UpperChooseShootingPointInstruction)); //upLocationChooser
    aiTriggers.push(new AIAlienDecisionTrigger(TriggerPosition.upperShootingPositions[0], new Vector3(2, 2, 2), JustShootInstruction)); //upLeft1
    aiTriggers.push(new AIAlienDecisionTrigger(TriggerPosition.upperShootingPositions[1], new Vector3(2, 2, 2), JustShootInstruction)); //upLeft2
    aiTriggers.push(new AIAlienDecisionTrigger(TriggerPosition.upperShootingPositions[2], new Vector3(2, 2, 2), UncoverAndShoot2Instruction)); //upMiddle1
    aiTriggers.push(new AIAlienDecisionTrigger(TriggerPosition.upperShootingPositions[3], new Vector3(2, 2, 2), JustShootInstruction)); //upMiddle2
    aiTriggers.push(new AIAlienDecisionTrigger(TriggerPosition.upperShootingPositions[4], new Vector3(2, 2, 2), UncoverAndShoot4Instruction)); //upRight1

    aiTriggers.forEach(triggerEntity => {
        engine.addEntity(triggerEntity)
    });
}

class AIAlienDecisionTrigger extends Entity {
    private aliens: Alien[] = [];

    public get taken(): boolean { return this.aliens.length > 0; }

    public constructor(position: Vector3, size: Vector3, orders: (Alien) => ActionsSequenceSystem.SequenceBuilder) {
        super();
        this.addComponent(new Transform({ position: position }));
        this.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(size, new Vector3(0, size.y * 0.5, 0)), layerAIDecisionTrigger, layerAliens,
            (entity) => {
                const alien = entity as Alien;
                const controller = AlienSpawner.instance.getAlienController(alien);
                if (controller != null) {
                    controller.receiveOrders(orders(alien));
                }
                this.aliens.push(alien);
            }, (entity) => {
                const alien = entity as Alien;
                const index = this.aliens.indexOf(alien)
                if (index >= 0) {
                    this.aliens.splice(index, 1);
                }
            }));
    }
}

function UpperSpawnPointInstruction(alien: Alien): ActionsSequenceSystem.SequenceBuilder {
    return new ActionsSequenceSystem.SequenceBuilder()
        .then(new AlienActions.WaitSeconds(2))
        .then(new AlienActions.MoveToPosition(alien, TriggerPosition.upLocationChooser));
}

function UpperChooseShootingPointInstruction(alien: Alien): ActionsSequenceSystem.SequenceBuilder {
    let shootPositionIndex = Random.INT.range(2, 7);
    if (Config.DEBUG_FORCE_SHOOT_POSITION >= 2) {
        shootPositionIndex = Config.DEBUG_FORCE_SHOOT_POSITION;
    }
    else {
        while (aiTriggers[shootPositionIndex].taken) {
            shootPositionIndex = Random.INT.range(2, 7);
        }
    }

    const shootPosition = aiTriggers[shootPositionIndex].getComponent(Transform).position;
    return new ActionsSequenceSystem.SequenceBuilder()
        .then(new AlienActions.MoveToPosition(alien, shootPosition));
}

function JustShootInstruction(alien: Alien): ActionsSequenceSystem.SequenceBuilder {
    return new ActionsSequenceSystem.SequenceBuilder()
        .while(() => true)
        .then(new AlienActions.WaitRandomSeconds(1, 5))
        .then(new AlienActions.Attack(alien))
        .endWhile();
}

function UncoverAndShoot2Instruction(alien: Alien): ActionsSequenceSystem.SequenceBuilder {
    return new ActionsSequenceSystem.SequenceBuilder()
        .while(() => true)
        .then(new AlienActions.WaitRandomSeconds(1, 5))
        .then(new AlienActions.MoveToPosition(alien, new Vector3(15.05, 4.15, 33.49)))
        .then(new AlienActions.Attack(alien))
        .then(new AlienActions.WaitSeconds(0.5))
        .if(() => Random.INT.max(2) == 1)
        .then(new AlienActions.Attack(alien))
        .then(new AlienActions.WaitSeconds(0.5))
        .endIf()
        .then(new AlienActions.MoveToPosition(alien, TriggerPosition.upperShootingPositions[2]))
        .endWhile();
}

function UncoverAndShoot4Instruction(alien: Alien): ActionsSequenceSystem.SequenceBuilder {
    return new ActionsSequenceSystem.SequenceBuilder()
        .while(() => true)
        .then(new AlienActions.WaitRandomSeconds(7, 15))
        .then(new AlienActions.MoveToPosition(alien, new Vector3(25.07, 3.82, 37.91)))
        .then(new AlienActions.Attack(alien))
        .then(new AlienActions.WaitSeconds(1.5))
        .if(() => Random.INT.max(2) == 1)
        .then(new AlienActions.Attack(alien))
        .then(new AlienActions.WaitSeconds(1.5))
        .endIf()
        .then(new AlienActions.MoveToPosition(alien, TriggerPosition.upperShootingPositions[4]))
        .endWhile();
}

class CallbackAction extends AlienActions.AlienAIActionBase {
    private callback: () => void;

    constructor(callback: () => void) {
        super(null);
        this.callback = callback;
    }

    onStart() {
        if (this.callback) this.callback();
        this.hasFinished = true;
    }
}