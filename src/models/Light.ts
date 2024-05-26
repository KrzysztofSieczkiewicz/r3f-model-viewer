import { newId } from '../utils/idUtil';

export enum LIGHT_TYPES {
  pointLight =  "Point light",
  spotLight = "Spot light"
};

export type LightOptions = 
  LIGHT_TYPES.pointLight | 
  LIGHT_TYPES.spotLight;


export type LightWrapper = {
  // COMMON
  id: string,
  type: LightOptions,
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