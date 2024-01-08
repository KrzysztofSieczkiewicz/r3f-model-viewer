import { createContext } from "react"
import { AssetWrapper } from "../../interfaces/asset.model"
import { LightType, LightWrapper } from "../../interfaces/light.model"
import { SceneWrapper } from "../../interfaces/scene.model"

type SidebarControlsContextType = {
    lightsList: LightWrapper[],
    updateLight: () => LightWrapper[],

    assetList: AssetWrapper[],
    updateAssetProperty: () => AssetWrapper[],

    scene: SceneWrapper,
    updateScene: () => void,
}

export const SidebarControlsContext = createContext<SidebarControlsContextType | undefined>(undefined);