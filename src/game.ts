import { loadGamePlay } from "./gamesdk"

const scene = new Entity()
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)
engine.addEntity(scene)

const groundFloorSciFi_03 = new Entity()
groundFloorSciFi_03.setParent(scene)
const gltfShape = new GLTFShape('models/GroundFloorSciFi_03/GroundFloorSciFi_03.glb')
groundFloorSciFi_03.addComponentOrReplace(gltfShape)
const transform_2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundFloorSciFi_03.addComponentOrReplace(transform_2)
engine.addEntity(groundFloorSciFi_03)

const groundFloorSciFi_03_2 = new Entity()
groundFloorSciFi_03_2.setParent(scene)
groundFloorSciFi_03_2.addComponentOrReplace(gltfShape)
const transform_3 = new Transform({
  position: new Vector3(24, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundFloorSciFi_03_2.addComponentOrReplace(transform_3)
engine.addEntity(groundFloorSciFi_03_2)

const groundFloorSciFi_03_3 = new Entity()
groundFloorSciFi_03_3.setParent(scene)
groundFloorSciFi_03_3.addComponentOrReplace(gltfShape)
const transform_4 = new Transform({
  position: new Vector3(8, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundFloorSciFi_03_3.addComponentOrReplace(transform_4)
engine.addEntity(groundFloorSciFi_03_3)

const groundFloorSciFi_03_4 = new Entity()
groundFloorSciFi_03_4.setParent(scene)
groundFloorSciFi_03_4.addComponentOrReplace(gltfShape)
const transform_5 = new Transform({
  position: new Vector3(24, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundFloorSciFi_03_4.addComponentOrReplace(transform_5)
engine.addEntity(groundFloorSciFi_03_4)

const groundFloorSciFi_03_5 = new Entity()
groundFloorSciFi_03_5.setParent(scene)
groundFloorSciFi_03_5.addComponentOrReplace(gltfShape)
const transform_6 = new Transform({
  position: new Vector3(8, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundFloorSciFi_03_5.addComponentOrReplace(transform_6)
engine.addEntity(groundFloorSciFi_03_5)

const groundFloorSciFi_03_6 = new Entity()
groundFloorSciFi_03_6.setParent(scene)
groundFloorSciFi_03_6.addComponentOrReplace(gltfShape)
const transform_7 = new Transform({
  position: new Vector3(24, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
groundFloorSciFi_03_6.addComponentOrReplace(transform_7)
engine.addEntity(groundFloorSciFi_03_6)

const streetFence_01 = new Entity()
streetFence_01.setParent(scene)
const gltfShape_2 = new GLTFShape('models/StreetFence_01/StreetFence_01.glb')
streetFence_01.addComponentOrReplace(gltfShape_2)
const transform_8 = new Transform({
  position: new Vector3(1.5, 0, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
streetFence_01.addComponentOrReplace(transform_8)
engine.addEntity(streetFence_01)

const streetFence_01_2 = new Entity()
streetFence_01_2.setParent(scene)
streetFence_01_2.addComponentOrReplace(gltfShape_2)
const transform_9 = new Transform({
  position: new Vector3(3.5, 0, 3),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
streetFence_01_2.addComponentOrReplace(transform_9)
engine.addEntity(streetFence_01_2)

const streetFence_01_3 = new Entity()
streetFence_01_3.setParent(scene)
streetFence_01_3.addComponentOrReplace(gltfShape_2)
const transform_10 = new Transform({
  position: new Vector3(6.5, 0, 1.5),
  rotation: new Quaternion(0, 0.7071067811865475, 0, 0.7071067811865477),
  scale: new Vector3(1, 1, 1)
})
streetFence_01_3.addComponentOrReplace(transform_10)
engine.addEntity(streetFence_01_3)

const hallway_Module_StraightHalf_01 = new Entity()
hallway_Module_StraightHalf_01.setParent(scene)
const gltfShape_3 = new GLTFShape('models/Hallway_Module_StraightHalf_01/Hallway_Module_StraightHalf_01.glb')
hallway_Module_StraightHalf_01.addComponentOrReplace(gltfShape_3)
const transform_11 = new Transform({
  position: new Vector3(4.5, 0, 39),
  rotation: new Quaternion(0, 0.7071067811865475, 0, 0.7071067811865477),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_StraightHalf_01.addComponentOrReplace(transform_11)
engine.addEntity(hallway_Module_StraightHalf_01)

const hallway_Big_Module_01 = new Entity()
hallway_Big_Module_01.setParent(scene)
const gltfShape_4 = new GLTFShape('models/Hallway_Big_Module_01/Hallway_Big_Module_01.glb')
hallway_Big_Module_01.addComponentOrReplace(gltfShape_4)
const transform_12 = new Transform({
  position: new Vector3(15.5, 0, 39),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
hallway_Big_Module_01.addComponentOrReplace(transform_12)
engine.addEntity(hallway_Big_Module_01)

const hallway_Module_StraightHalf_01_2 = new Entity()
hallway_Module_StraightHalf_01_2.setParent(scene)
hallway_Module_StraightHalf_01_2.addComponentOrReplace(gltfShape_3)
const transform_13 = new Transform({
  position: new Vector3(1.5, 0, 39),
  rotation: new Quaternion(0, 0.7071067811865475, 0, 0.7071067811865477),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_StraightHalf_01_2.addComponentOrReplace(transform_13)
engine.addEntity(hallway_Module_StraightHalf_01_2)

const hallway_Module_StraightHalf_01_3 = new Entity()
hallway_Module_StraightHalf_01_3.setParent(scene)
hallway_Module_StraightHalf_01_3.addComponentOrReplace(gltfShape_3)
const transform_14 = new Transform({
  position: new Vector3(23.5, 0, 39),
  rotation: new Quaternion(0, 0.7071067811865475, 0, 0.7071067811865477),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_StraightHalf_01_3.addComponentOrReplace(transform_14)
engine.addEntity(hallway_Module_StraightHalf_01_3)

const hallway_Module_StraightHalf_01_4 = new Entity()
hallway_Module_StraightHalf_01_4.setParent(scene)
hallway_Module_StraightHalf_01_4.addComponentOrReplace(gltfShape_3)
const transform_15 = new Transform({
  position: new Vector3(26.5, 0, 39),
  rotation: new Quaternion(0, 0.7071067811865475, 0, 0.7071067811865477),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_StraightHalf_01_4.addComponentOrReplace(transform_15)
engine.addEntity(hallway_Module_StraightHalf_01_4)

const hallway_Module_Door_01 = new Entity()
hallway_Module_Door_01.setParent(scene)
const gltfShape_5 = new GLTFShape('models/Hallway_Module_Door_01/Hallway_Module_Door_01.glb')
hallway_Module_Door_01.addComponentOrReplace(gltfShape_5)
const transform_16 = new Transform({
  position: new Vector3(15.5, 0, 31.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_Door_01.addComponentOrReplace(transform_16)
engine.addEntity(hallway_Module_Door_01)

const lightCube_02 = new Entity()
lightCube_02.setParent(scene)
const gltfShape_6 = new GLTFShape('models/LightCube_02/LightCube_02.glb')
lightCube_02.addComponentOrReplace(gltfShape_6)
const transform_17 = new Transform({
  position: new Vector3(26, 0, 28.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lightCube_02.addComponentOrReplace(transform_17)
engine.addEntity(lightCube_02)

const lightCube_02_2 = new Entity()
lightCube_02_2.setParent(scene)
lightCube_02_2.addComponentOrReplace(gltfShape_6)
const transform_18 = new Transform({
  position: new Vector3(4.5, 0, 28.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lightCube_02_2.addComponentOrReplace(transform_18)
engine.addEntity(lightCube_02_2)

const lightCube_02_3 = new Entity()
lightCube_02_3.setParent(scene)
lightCube_02_3.addComponentOrReplace(gltfShape_6)
const transform_19 = new Transform({
  position: new Vector3(6.5, 0, 28.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lightCube_02_3.addComponentOrReplace(transform_19)
engine.addEntity(lightCube_02_3)

const lightCube_02_4 = new Entity()
lightCube_02_4.setParent(scene)
lightCube_02_4.addComponentOrReplace(gltfShape_6)
const transform_20 = new Transform({
  position: new Vector3(24, 0, 28.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lightCube_02_4.addComponentOrReplace(transform_20)
engine.addEntity(lightCube_02_4)

const turret_02 = new Entity()
turret_02.setParent(scene)
const gltfShape_7 = new GLTFShape('models/Turret_02/Turret_02.glb')
turret_02.addComponentOrReplace(gltfShape_7)
const transform_21 = new Transform({
  position: new Vector3(25, 1, 30),
  rotation: new Quaternion(0, 1, 0, 8.326672684688674e-17),
  scale: new Vector3(1, 1, 1)
})
turret_02.addComponentOrReplace(transform_21)
engine.addEntity(turret_02)

const turret_02_2 = new Entity()
turret_02_2.setParent(scene)
turret_02_2.addComponentOrReplace(gltfShape_7)
const transform_22 = new Transform({
  position: new Vector3(5.5, 1, 30),
  rotation: new Quaternion(0, 1, 0, 8.326672684688674e-17),
  scale: new Vector3(1, 1, 1)
})
turret_02_2.addComponentOrReplace(transform_22)
engine.addEntity(turret_02_2)

const turretBase_02 = new Entity()
turretBase_02.setParent(scene)
const gltfShape_8 = new GLTFShape('models/TurretBase_02/TurretBase_02.glb')
turretBase_02.addComponentOrReplace(gltfShape_8)
const transform_23 = new Transform({
  position: new Vector3(25, 0, 30),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
turretBase_02.addComponentOrReplace(transform_23)
engine.addEntity(turretBase_02)

const turretBase_02_2 = new Entity()
turretBase_02_2.setParent(scene)
turretBase_02_2.addComponentOrReplace(gltfShape_8)
const transform_24 = new Transform({
  position: new Vector3(5.5, 0, 30),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
turretBase_02_2.addComponentOrReplace(transform_24)
engine.addEntity(turretBase_02_2)

const hallway_Module_Straight_01 = new Entity()
hallway_Module_Straight_01.setParent(scene)
const gltfShape_9 = new GLTFShape('models/Hallway_Module_Straight_01/Hallway_Module_Straight_01.glb')
hallway_Module_Straight_01.addComponentOrReplace(gltfShape_9)
const transform_25 = new Transform({
  position: new Vector3(15.5, 4, 41),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_Straight_01.addComponentOrReplace(transform_25)
engine.addEntity(hallway_Module_Straight_01)

const hallway_Module_Door_01_2 = new Entity()
hallway_Module_Door_01_2.setParent(scene)
hallway_Module_Door_01_2.addComponentOrReplace(gltfShape_5)
const transform_26 = new Transform({
  position: new Vector3(15.5, 4, 46.5),
  rotation: new Quaternion(0, -1.0000000000000007, 0, 9.71445146547012e-17),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_Door_01_2.addComponentOrReplace(transform_26)
engine.addEntity(hallway_Module_Door_01_2)

const hallway_Module_Straight_01_2 = new Entity()
hallway_Module_Straight_01_2.setParent(scene)
hallway_Module_Straight_01_2.addComponentOrReplace(gltfShape_9)
const transform_27 = new Transform({
  position: new Vector3(15, 0, 39),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_Straight_01_2.addComponentOrReplace(transform_27)
engine.addEntity(hallway_Module_Straight_01_2)

const hallway_Module_Door_02 = new Entity()
hallway_Module_Door_02.setParent(scene)
const gltfShape_10 = new GLTFShape('models/Hallway_Module_Door_02/Hallway_Module_Door_02.glb')
hallway_Module_Door_02.addComponentOrReplace(gltfShape_10)
const transform_28 = new Transform({
  position: new Vector3(15.5, 4, 41.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
hallway_Module_Door_02.addComponentOrReplace(transform_28)
engine.addEntity(hallway_Module_Door_02)

const fence_Straight_01 = new Entity()
fence_Straight_01.setParent(scene)
const gltfShape_11 = new GLTFShape('models/Fence_Straight_01/Fence_Straight_01.glb')
fence_Straight_01.addComponentOrReplace(gltfShape_11)
const transform_29 = new Transform({
  position: new Vector3(4, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01.addComponentOrReplace(transform_29)
engine.addEntity(fence_Straight_01)

const fence_Straight_01_2 = new Entity()
fence_Straight_01_2.setParent(scene)
fence_Straight_01_2.addComponentOrReplace(gltfShape_11)
const transform_30 = new Transform({
  position: new Vector3(8, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_2.addComponentOrReplace(transform_30)
engine.addEntity(fence_Straight_01_2)

const fence_Straight_01_3 = new Entity()
fence_Straight_01_3.setParent(scene)
fence_Straight_01_3.addComponentOrReplace(gltfShape_11)
const transform_31 = new Transform({
  position: new Vector3(6, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_3.addComponentOrReplace(transform_31)
engine.addEntity(fence_Straight_01_3)

const fence_Straight_01_4 = new Entity()
fence_Straight_01_4.setParent(scene)
fence_Straight_01_4.addComponentOrReplace(gltfShape_11)
const transform_32 = new Transform({
  position: new Vector3(12, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_4.addComponentOrReplace(transform_32)
engine.addEntity(fence_Straight_01_4)

const fence_Straight_01_5 = new Entity()
fence_Straight_01_5.setParent(scene)
fence_Straight_01_5.addComponentOrReplace(gltfShape_11)
const transform_33 = new Transform({
  position: new Vector3(10, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_5.addComponentOrReplace(transform_33)
engine.addEntity(fence_Straight_01_5)

const fence_Straight_01_6 = new Entity()
fence_Straight_01_6.setParent(scene)
fence_Straight_01_6.addComponentOrReplace(gltfShape_11)
const transform_34 = new Transform({
  position: new Vector3(30, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_6.addComponentOrReplace(transform_34)
engine.addEntity(fence_Straight_01_6)

const fence_Straight_01_7 = new Entity()
fence_Straight_01_7.setParent(scene)
fence_Straight_01_7.addComponentOrReplace(gltfShape_11)
const transform_35 = new Transform({
  position: new Vector3(22, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_7.addComponentOrReplace(transform_35)
engine.addEntity(fence_Straight_01_7)

const fence_Straight_01_8 = new Entity()
fence_Straight_01_8.setParent(scene)
fence_Straight_01_8.addComponentOrReplace(gltfShape_11)
const transform_36 = new Transform({
  position: new Vector3(26, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_8.addComponentOrReplace(transform_36)
engine.addEntity(fence_Straight_01_8)

const fence_Straight_01_9 = new Entity()
fence_Straight_01_9.setParent(scene)
fence_Straight_01_9.addComponentOrReplace(gltfShape_11)
const transform_37 = new Transform({
  position: new Vector3(28, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_9.addComponentOrReplace(transform_37)
engine.addEntity(fence_Straight_01_9)

const fence_Straight_01_10 = new Entity()
fence_Straight_01_10.setParent(scene)
fence_Straight_01_10.addComponentOrReplace(gltfShape_11)
const transform_38 = new Transform({
  position: new Vector3(24, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_01_10.addComponentOrReplace(transform_38)
engine.addEntity(fence_Straight_01_10)

const floor_Module_01 = new Entity()
floor_Module_01.setParent(scene)
const gltfShape_12 = new GLTFShape('models/Floor_Module_01/Floor_Module_01.glb')
floor_Module_01.addComponentOrReplace(gltfShape_12)
const transform_39 = new Transform({
  position: new Vector3(17.5, 0, 30.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
floor_Module_01.addComponentOrReplace(transform_39)
engine.addEntity(floor_Module_01)

const floor_Module_01_2 = new Entity()
floor_Module_01_2.setParent(scene)
floor_Module_01_2.addComponentOrReplace(gltfShape_12)
const transform_40 = new Transform({
  position: new Vector3(17.5, 0, 28),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
floor_Module_01_2.addComponentOrReplace(transform_40)
engine.addEntity(floor_Module_01_2)

const floor_Module_01_3 = new Entity()
floor_Module_01_3.setParent(scene)
floor_Module_01_3.addComponentOrReplace(gltfShape_12)
const transform_41 = new Transform({
  position: new Vector3(17.5, 0, 25.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
floor_Module_01_3.addComponentOrReplace(transform_41)
engine.addEntity(floor_Module_01_3)

const stone_05 = new Entity()
stone_05.setParent(scene)
const gltfShape_13 = new GLTFShape('models/Stone_05/Stone_05.glb')
stone_05.addComponentOrReplace(gltfShape_13)
const transform_42 = new Transform({
  position: new Vector3(17.5, 0, 12),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
stone_05.addComponentOrReplace(transform_42)
engine.addEntity(stone_05)

const stone_04 = new Entity()
stone_04.setParent(scene)
const gltfShape_14 = new GLTFShape('models/Stone_04/Stone_04.glb')
stone_04.addComponentOrReplace(gltfShape_14)
const transform_43 = new Transform({
  position: new Vector3(27.5, 0, 11.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
stone_04.addComponentOrReplace(transform_43)
engine.addEntity(stone_04)

const stone_04_2 = new Entity()
stone_04_2.setParent(scene)
stone_04_2.addComponentOrReplace(gltfShape_14)
const transform_44 = new Transform({
  position: new Vector3(4, 0, 15.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
stone_04_2.addComponentOrReplace(transform_44)
engine.addEntity(stone_04_2)

const dirt_02 = new Entity()
dirt_02.setParent(scene)
const gltfShape_15 = new GLTFShape('models/Dirt_02/Dirt_02.glb')
dirt_02.addComponentOrReplace(gltfShape_15)
const transform_45 = new Transform({
  position: new Vector3(9.5, 0, 9.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
dirt_02.addComponentOrReplace(transform_45)
engine.addEntity(dirt_02)

const crater_02 = new Entity()
crater_02.setParent(scene)
const gltfShape_16 = new GLTFShape('models/Crater_02/Crater_02.glb')
crater_02.addComponentOrReplace(gltfShape_16)
const transform_46 = new Transform({
  position: new Vector3(21, 0, 7.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
crater_02.addComponentOrReplace(transform_46)
engine.addEntity(crater_02)

const dirt_03 = new Entity()
dirt_03.setParent(scene)
const gltfShape_17 = new GLTFShape('models/Dirt_03/Dirt_03.glb')
dirt_03.addComponentOrReplace(gltfShape_17)
const transform_47 = new Transform({
  position: new Vector3(26.5, 0, 2),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
dirt_03.addComponentOrReplace(transform_47)
engine.addEntity(dirt_03)

const crater_01 = new Entity()
crater_01.setParent(scene)
const gltfShape_18 = new GLTFShape('models/Crater_01/Crater_01.glb')
crater_01.addComponentOrReplace(gltfShape_18)
const transform_48 = new Transform({
  position: new Vector3(24, 0, 19.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
crater_01.addComponentOrReplace(transform_48)
engine.addEntity(crater_01)

const lampPostSciFi_01 = new Entity()
lampPostSciFi_01.setParent(scene)
const gltfShape_19 = new GLTFShape('models/LampPostSciFi_01/LampPostSciFi_01.glb')
lampPostSciFi_01.addComponentOrReplace(gltfShape_19)
const transform_49 = new Transform({
  position: new Vector3(21.5, 0, 21.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lampPostSciFi_01.addComponentOrReplace(transform_49)
engine.addEntity(lampPostSciFi_01)

const lampPostSciFi_01_2 = new Entity()
lampPostSciFi_01_2.setParent(scene)
lampPostSciFi_01_2.addComponentOrReplace(gltfShape_19)
const transform_50 = new Transform({
  position: new Vector3(11, 0, 21.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
lampPostSciFi_01_2.addComponentOrReplace(transform_50)
engine.addEntity(lampPostSciFi_01_2)

const oxygenStorage_01 = new Entity()
oxygenStorage_01.setParent(scene)
const gltfShape_20 = new GLTFShape('models/OxygenStorage_01/OxygenStorage_01.glb')
oxygenStorage_01.addComponentOrReplace(gltfShape_20)
const transform_51 = new Transform({
  position: new Vector3(28, 3.7534812412261314, 37),
  rotation: new Quaternion(0, 1, 0, -8.326672684688674e-17),
  scale: new Vector3(1, 1, 1)
})
oxygenStorage_01.addComponentOrReplace(transform_51)
engine.addEntity(oxygenStorage_01)

const crateBlueBig_01 = new Entity()
crateBlueBig_01.setParent(scene)
const gltfShape_21 = new GLTFShape('models/CrateBlueBig_01/CrateBlueBig_01.glb')
crateBlueBig_01.addComponentOrReplace(gltfShape_21)
const transform_52 = new Transform({
  position: new Vector3(17.5, 4, 32),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
crateBlueBig_01.addComponentOrReplace(transform_52)
engine.addEntity(crateBlueBig_01)

const battery_02 = new Entity()
battery_02.setParent(scene)
const gltfShape_22 = new GLTFShape('models/Battery_02/Battery_02.glb')
battery_02.addComponentOrReplace(gltfShape_22)
const transform_53 = new Transform({
  position: new Vector3(6, 3.672061013701992, 36.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
battery_02.addComponentOrReplace(transform_53)
engine.addEntity(battery_02)

const battery_02_2 = new Entity()
battery_02_2.setParent(scene)
battery_02_2.addComponentOrReplace(gltfShape_22)
const transform_54 = new Transform({
  position: new Vector3(6, 4.162381856651528, 36.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
battery_02_2.addComponentOrReplace(transform_54)
engine.addEntity(battery_02_2)

const drawer_02 = new Entity()
drawer_02.setParent(scene)
const gltfShape_23 = new GLTFShape('models/Drawer_02/Drawer_02.glb')
drawer_02.addComponentOrReplace(gltfShape_23)
const transform_55 = new Transform({
  position: new Vector3(2.5, 3.5, 36.5),
  rotation: new Quaternion(0, 0.7071067811865476, 0, 0.7071067811865478),
  scale: new Vector3(1, 1, 1)
})
drawer_02.addComponentOrReplace(transform_55)
engine.addEntity(drawer_02)

const crateYellowBig_01 = new Entity()
crateYellowBig_01.setParent(scene)
const gltfShape_24 = new GLTFShape('models/CrateYellowBig_01/CrateYellowBig_01.glb')
crateYellowBig_01.addComponentOrReplace(gltfShape_24)
const transform_56 = new Transform({
  position: new Vector3(13, 3.8940073400386073, 32),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
crateYellowBig_01.addComponentOrReplace(transform_56)
engine.addEntity(crateYellowBig_01)

const crateYellowBig_01_2 = new Entity()
crateYellowBig_01_2.setParent(scene)
crateYellowBig_01_2.addComponentOrReplace(gltfShape_24)
const transform_57 = new Transform({
  position: new Vector3(13, 4.5, 32),
  rotation: new Quaternion(0, -1, 0, 4.163336342344337e-17),
  scale: new Vector3(1, 1, 1)
})
crateYellowBig_01_2.addComponentOrReplace(transform_57)
engine.addEntity(crateYellowBig_01_2)

const neonLightTube_01 = new Entity()
neonLightTube_01.setParent(scene)
const gltfShape_25 = new GLTFShape('models/NeonLightTube_01/NeonLightTube_01.glb')
neonLightTube_01.addComponentOrReplace(gltfShape_25)
const transform_58 = new Transform({
  position: new Vector3(13.5, 3.66214036694487, 31),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
neonLightTube_01.addComponentOrReplace(transform_58)
engine.addEntity(neonLightTube_01)

const neonLightTube_01_2 = new Entity()
neonLightTube_01_2.setParent(scene)
neonLightTube_01_2.addComponentOrReplace(gltfShape_25)
const transform_59 = new Transform({
  position: new Vector3(17.5, 3.6294907969743537, 31),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
neonLightTube_01_2.addComponentOrReplace(transform_59)
engine.addEntity(neonLightTube_01_2)

const neonLightTube_04 = new Entity()
neonLightTube_04.setParent(scene)
const gltfShape_26 = new GLTFShape('models/NeonLightTube_04/NeonLightTube_04.glb')
neonLightTube_04.addComponentOrReplace(gltfShape_26)
const transform_60 = new Transform({
  position: new Vector3(25, 3, 36),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
neonLightTube_04.addComponentOrReplace(transform_60)
engine.addEntity(neonLightTube_04)

const neonLightTube_04_2 = new Entity()
neonLightTube_04_2.setParent(scene)
neonLightTube_04_2.addComponentOrReplace(gltfShape_26)
const transform_61 = new Transform({
  position: new Vector3(6, 3, 36),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
neonLightTube_04_2.addComponentOrReplace(transform_61)
engine.addEntity(neonLightTube_04_2)

const crateOrange_01 = new Entity()
crateOrange_01.setParent(scene)
const gltfShape_27 = new GLTFShape('models/CrateOrange_01/CrateOrange_01.glb')
crateOrange_01.addComponentOrReplace(gltfShape_27)
const transform_62 = new Transform({
  position: new Vector3(2, 0, 2.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
crateOrange_01.addComponentOrReplace(transform_62)
engine.addEntity(crateOrange_01)

const fence_Straight_02 = new Entity()
fence_Straight_02.setParent(scene)
const gltfShape_28 = new GLTFShape('models/Fence_Straight_02/Fence_Straight_02.glb')
fence_Straight_02.addComponentOrReplace(gltfShape_28)
const transform_63 = new Transform({
  position: new Vector3(17.5, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_Straight_02.addComponentOrReplace(transform_63)
engine.addEntity(fence_Straight_02)

const fence_End_01 = new Entity()
fence_End_01.setParent(scene)
const gltfShape_29 = new GLTFShape('models/Fence_End_01/Fence_End_01.glb')
fence_End_01.addComponentOrReplace(gltfShape_29)
const transform_64 = new Transform({
  position: new Vector3(14, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_End_01.addComponentOrReplace(transform_64)
engine.addEntity(fence_End_01)

const fence_End_01_2 = new Entity()
fence_End_01_2.setParent(scene)
fence_End_01_2.addComponentOrReplace(gltfShape_29)
const transform_65 = new Transform({
  position: new Vector3(18, 0, 22.5),
  rotation: new Quaternion(0, 0.9999999999999999, 0, 9.71445146547012e-17),
  scale: new Vector3(1, 1, 1)
})
fence_End_01_2.addComponentOrReplace(transform_65)
engine.addEntity(fence_End_01_2)

const fence_End_01_3 = new Entity()
fence_End_01_3.setParent(scene)
fence_End_01_3.addComponentOrReplace(gltfShape_29)
const transform_66 = new Transform({
  position: new Vector3(31.60044446091608, 0, 22.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
fence_End_01_3.addComponentOrReplace(transform_66)
engine.addEntity(fence_End_01_3)

const fence_End_01_4 = new Entity()
fence_End_01_4.setParent(scene)
fence_End_01_4.addComponentOrReplace(gltfShape_29)
const transform_67 = new Transform({
  position: new Vector3(0.3715133871810954, 0, 22.5),
  rotation: new Quaternion(0, -1.0000000000000002, 0, -9.71445146547012e-17),
  scale: new Vector3(1, 1, 1)
})
fence_End_01_4.addComponentOrReplace(transform_67)
engine.addEntity(fence_End_01_4)

loadGamePlay(turret_02, turret_02_2);