import { Dispatch, createContext } from "react"
import { AssetWrapper } from "../../interfaces/asset.model"
import { LightWrapper } from "../../interfaces/light.model"
import { SceneWrapper } from "../../interfaces/scene.model"

type SidebarControlsContextType = {
    lightsList: LightWrapper[],
    setLightsList: Dispatch<React.SetStateAction<LightWrapper[]>>,

    assetsList: AssetWrapper[],
    setAssetsList: Dispatch<React.SetStateAction<AssetWrapper[]>>,
}

export const SidebarControlsContext = createContext<SidebarControlsContextType>({
    lightsList: [],
    setLightsList: () => [],
    assetsList: [],
    setAssetsList: () => [],
   });