import { createContext } from "react";

type SidebarControlsContext =  {
    lightsList: Light[], 
    updateLight: (id:string, propartyName:string, value:any) => void, 
    lightTypes: {
        type: string,
        display: string
    }[], 
    assetsList: Asset[], 
    updateAssetProperty: (id:string, propartyName:string, value:any) => void,
    scene: Scene, 
    updateScene: (propartyName:string, value:any) => void
}

type Light = {
    id: string,
    position: number[],
    color: string,
    intensity: number,
    angle: number,
    penumbra: number,
    visible: boolean,
    type: string,
}

type Asset = {
    id: string,
    object: string,
    name: string,
    position: number[],
    rotation: number[],
    scale: number[],
    ref: HTMLDivElement | null,
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean,
    isSelected: boolean,
}

type Scene = {
    backgroundColor: string,
    ambientLight: {
      color: string,
      intensity: number
    }
  }

const SidebarControlsContext = createContext<SidebarControlsContext>({} as SidebarControlsContext);

export default SidebarControlsContext;