import { newId } from '../utils/idUtil';

export enum LIGHT_TYPES {
  pointLight =  "Point light",
  spotLight = "Spot light"
};
export type LightTypes = 
  LIGHT_TYPES.pointLight | 
  LIGHT_TYPES.spotLight;


type BaseLightProperties = {
  isVisible: boolean,
  position: [number,number,number],
  color: string,
  intensity: number,
  distance: number,
}

export type PointLightProperties = BaseLightProperties & {};

export type SpotLightProperties = BaseLightProperties & {
  angle: number,
  penumbra: number,
}

export type LightProperties = PointLightProperties | SpotLightProperties;

export type LightWrapper = 
  { type: LIGHT_TYPES.pointLight, id: string, properties: PointLightProperties } | 
  { type: LIGHT_TYPES.spotLight, id: string, properties: SpotLightProperties }
;

const INIT_LIGHTS_LIST: LightWrapper[] = [
  {
    type: LIGHT_TYPES.pointLight,
    id:newId(),
    properties: {
      isVisible: true,
      position:[3,0.5,0],
      distance: 10,
      color: "#f53259",
      intensity:1,
    }
  },{
    type: LIGHT_TYPES.spotLight,
    id:newId(),
    properties: {
      isVisible: true,
      position:[-1,2.25,-1],
      distance: 10,
      color:"#33dcfa",
      intensity:1,
      angle: 0.3,
      penumbra: 0.6,
    }
  }
]

const defaultLight: LightWrapper = {
  type: LIGHT_TYPES.pointLight,
  id:newId(),
  properties: {
    isVisible: true,
    position:[2,1,1],
    distance: 10,
    color: "white",
    intensity:1,
  }
  
}

export { INIT_LIGHTS_LIST, defaultLight };