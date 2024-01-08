import { AssetWrapper } from "../../interfaces/asset.model"
import { LightType, LightWrapper } from "../../interfaces/light.model"
import { SceneWrapper } from "../../interfaces/scene.model"

type SidebarControlsContextType = {
    lightsList: LightWrapper[],
    updateLight: () => void,

    assetList: AssetWrapper[],
    updateAssetProperty: () => void,
    
    scene: SceneWrapper,
    updateScene: () => void,
}
