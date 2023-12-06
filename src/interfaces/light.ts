import THREE from "three";
import { LightWrapper } from "./light.model";

export class PointLightWrapper implements LightWrapper {
    id: string;
    position: THREE.Vector3 | undefined;
    rotation: THREE.Euler | undefined;
    color: string;
    intensity: number;
    type: typeof THREE.PointLight;
    visible: boolean;
}
export class SpotLightWrapper implements LightWrapper {
    id: string;
    position: THREE.Vector3 | undefined;
    rotation: THREE.Euler | undefined;
    color: string;
    intensity: number;
    angle: number;
    penumbra: number;
    type: typeof THREE.PointLight;
    visible: boolean;
}