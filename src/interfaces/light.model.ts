import THREE, { Euler, Vector3 } from "three";

export interface LightWrapper {
    id: string,
    position: Vector3 | undefined,
    rotation: Euler | undefined,
    color: string,
    intensity: number,
    angle?: number,
    penumbra?: number,
    type: LightType,
    visible: boolean,
}

export type LightType = typeof THREE.PointLight | typeof THREE.SpotLight