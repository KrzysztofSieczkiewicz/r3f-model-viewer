import { newId } from '../utils/idUtil';

export type LightWrapper = {
  // COMMON
  id: string,
  type: LightOption,
  visible: boolean,
  position: [number,number,number],
  rotation: [number,number,number],
  color: string,
  intensity: number,
  distance: number,

  // SPOTLIGHT
  angle: number,
  penumbra: number,
    
}

export type LightOption = "Point light" | "Spot light"
export enum LIGHT_TYPES {
  pointLight =  "Point light",
  spotLight = "Spot light"
};

const INIT_LIGHTS_LIST: LightWrapper[] = [
  {
    id:newId(),
    type: LIGHT_TYPES.pointLight,
    visible: true,
    position:[3,0.5,0],
    rotation:[0, 0, 0],
    distance: 10,
    color: "#f53259",
    intensity:1,
    angle: 0.3,
    penumbra: 0.6,
  },{
    id:newId(),
    type: LIGHT_TYPES.spotLight,
    visible: true,
    position:[-1,2.25,-1],
    rotation:[0,0,0],
    distance: 10,
    color:"#33dcfa",
    intensity:1,
    angle: 0.3,
    penumbra: 0.6,
  }
]

const defaultLight = {
  id:newId(),
  type: LIGHT_TYPES.pointLight,
  visible: true,
  position:[2,1,1],
  rotation:[0,0,0],
  distance: 10,
  color: "white",
  intensity:1,
  angle: 0.3,
  penumbra: 0.6,
  target: [0,0,0]
}

export { INIT_LIGHTS_LIST, defaultLight };