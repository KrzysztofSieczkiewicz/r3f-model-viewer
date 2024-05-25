import { newId } from '../utils/idUtil';

export type LightWrapper = {
    id: string,
    position: [number,number,number],
    rotation: [number,number,number],
    color: string,
    intensity: number,
    angle: number,
    penumbra: number,
    distance: number,
    type: LightOption,
    visible: boolean,
}

export type LightOption = "Point light" | "Spot light"
export enum LIGHT_TYPES {
  pointLight =  "Point light",
  spotLight = "Spot light"
};

const INIT_LIGHTS_LIST: LightWrapper[] = [
    {
      id:newId(),
      position:[3,0.5,0],
      rotation:[0, 0, 0],
      color: "#f53259",
      intensity:1,
      angle: 0.3,
      penumbra: 0.6,
      distance: 10,
      type: LIGHT_TYPES.pointLight,
      visible: true
    },{
      id:newId(),
      position:[-1,2.25,-1],
      rotation:[0,0,0],
      color:"#33dcfa",
      intensity:1,
      angle: 0.3,
      penumbra: 0.6,
      distance: 10,
      type: LIGHT_TYPES.spotLight,
      visible: true
    }
  ]

const defaultLight = {
    id:newId(),
    position:[2,1,1],
    rotation:[0,0,0],
    color: "white",
    intensity:1,
    angle: 0.3,
    penumbra: 0.6,
    distance: 10,
    type: LIGHT_TYPES.pointLight,
    visible: true
}

export { INIT_LIGHTS_LIST, defaultLight };