import { nanoid } from 'nanoid';

export type LightWrapper = {
    id: string,
    position: [number,number,number],
    rotation: [number,number,number],
    color: string,
    intensity: number,
    angle: number,
    penumbra: number,
    visible: boolean,
    type: string,
}

const INIT_LIGHTS_LIST: LightWrapper[] = [
    {
      id:nanoid(5),
      position:[5,5,0],
      rotation:[Math.PI * 0.5, Math.PI * 0.5, 0],
      color: "#f53259",
      intensity:1,
      angle: 0.1,
      penumbra: 0.6,
      type:"spotLight",
      visible: true
    },{
      id:nanoid(5),
      position:[-5,5,-5],
      rotation:[0,0,0],
      color:"#33dcfa",
      intensity:1,
      angle: 0.1,
      penumbra: 0.6,
      type:"pointLight",
      visible: true
    }
  ]

const lightTypes = [
    {type: 'pointLight', display: "Point light"},
    {type: 'spotLight', display: "Spot light"}
];

const defaultLight = {
    id: nanoid(5),
    type: "pointLight",
    position:[5,5,0],
    rotation:[0,0,0], // TODO: Remove and replace by target later on
    color: "white",
    intensity: 1,
    angle: 0.1,
    penumbra: 0.6,
    visible: true
}

export { INIT_LIGHTS_LIST, lightTypes, defaultLight };