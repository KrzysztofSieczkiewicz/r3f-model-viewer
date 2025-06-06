import { generateNewID } from '../utils/idUtil';

export enum LIGHT_TYPES {
  pointLight = "Point",
  spotLight = "Spotlight",
  directionalLight = "Directional",
};
export type LightType = 
  LIGHT_TYPES.pointLight | 
  LIGHT_TYPES.spotLight |
  LIGHT_TYPES.directionalLight;


type BaseLightProperties = {
  isVisible: boolean,
  position: [number,number,number],
  color: string,
  intensity: number,
}

export type PointLightProperties = BaseLightProperties & {
  distance: number,
  decay: number,
};

export type SpotLightProperties = BaseLightProperties & {
  distance: number,
  angle: number,
  radius: number,
  penumbra: number,
  target: [number, number, number],
  decay: number,
  attenuation: number,
  attenuationBlending: number,
}

export type DirectionalLightProperties = BaseLightProperties & {
  target: [number, number, number], // TODO: also add to spotLight (if target is not set - create empty object with coordinates that can be manipulated)
}

export type LightProperties = PointLightProperties | SpotLightProperties | DirectionalLightProperties;



export type LightWrapper = 
  { type: LIGHT_TYPES.pointLight, id: string, properties: PointLightProperties } | 
  { type: LIGHT_TYPES.spotLight, id: string, properties: SpotLightProperties } |
  { type: LIGHT_TYPES.directionalLight, id: string, properties: DirectionalLightProperties}
;

const INIT_LIGHTS_LIST: LightWrapper[] = [
  {
    type: LIGHT_TYPES.pointLight,
    id:generateNewID(),
    properties: {
      isVisible: true,
      position:[3,0.5,0],
      distance: 10,
      decay: 0,
      color: "#f53259",
      intensity:1,
    }
  },{
    type: LIGHT_TYPES.spotLight,
    id:generateNewID(),
    properties: {
      isVisible: true,
      position:[-1,2.25,-1],
      distance: 10,
      radius: 0,
      color:"#33dcfa",
      intensity:1,
      angle: 0.3,
      penumbra: 0.6,
      decay: 0,
      attenuation: 0,
      attenuationBlending: 0,
      target: [0,0,0]
    }
  },{
    type: LIGHT_TYPES.directionalLight,
    id:generateNewID(),
    properties: {
      isVisible: true,
      position:[2,2,2],
      color:"#33dcfa",
      intensity:1,
      target:[0,0,0]
    }
  }
]

const createDefaultPointlight = (): LightWrapper => ({
  type: LIGHT_TYPES.pointLight,
  id: generateNewID(),
  properties: {
    isVisible: true,
    position:[2,1,1],
    distance: 10,
    decay: 0,
    color: "white",
    intensity:1,
  }
});

const createDefaultSpotlight = (): LightWrapper => ({
  type: LIGHT_TYPES.spotLight,
  id: generateNewID(),
  properties: {
    isVisible: true,
    position:[2,1,1],
    distance: 10,
    radius: 0,
    color: "white",
    intensity:1,
    angle: 0.6,
    penumbra: 0.6,
    decay: 0,
    attenuation: 0,
    attenuationBlending: 0,
    target: [0,0,0]
  }
});

const createDefaultDirectionalLight = (): LightWrapper => ({
  type: LIGHT_TYPES.directionalLight,
  id: generateNewID(),
  properties: {
    isVisible: true,
    position:[2,1,1],
    color: "white",
    intensity:1,
    target:[0,0,0]
  }
});


const getDefaultLight = (type: LightType) => {
  switch(type) {
    case LIGHT_TYPES.pointLight:
      return createDefaultPointlight();
    case LIGHT_TYPES.spotLight:
      return createDefaultSpotlight();
    case LIGHT_TYPES.directionalLight:
      return createDefaultDirectionalLight();
  }
}

export { INIT_LIGHTS_LIST, getDefaultLight};