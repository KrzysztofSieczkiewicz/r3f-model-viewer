import { Euler, Vector3 } from "three";

export interface AssetWrapper {
    id: string,
    name: string,
    object: string,
    position: Vector3 | undefined,
    rotation: Euler | undefined,
    scale: Vector3 | undefined,
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean,
}