import { Euler, PointLight, SpotLight, Vector3 } from "three";

export interface LightWrapper {
    id: string,
    position: Vector3 | undefined,
    rotation: Euler | undefined,
    color: string,
    intensity: number,
    angle: number,
    penumbra: number,
    type: LightType,
    visible: boolean,
}

export type LightType = typeof PointLight | typeof SpotLight

type LightTypeName = {
    type: LightType;
    display: string;
};
export const LightTypesNames: LightTypeName[] = [
{ type: PointLight, display: 'Point Light' },
{ type: PointLight, display: 'Spot Light' },
];