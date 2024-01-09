import { createContext } from "react"
import { AssetWrapper } from "../../interfaces/asset.model"
import { LightType, LightWrapper } from "../../interfaces/light.model"
import { SceneWrapper } from "../../interfaces/scene.model"

type SidebarControlsContextType = {
    lightsList: LightWrapper[],
    updateLight: () => LightWrapper[],

    assetList: AssetWrapper[],
    updateAsset: () => AssetWrapper[],

    scene: SceneWrapper | undefined, // remove undefined later on
    updateScene: () => void,
}

export const SidebarControlsContext = createContext<SidebarControlsContextType>({
    lightsList: [],
    updateLight: () => [],
    assetList: [],
    updateAsset: () => [],
    scene: {
        backgroundColor: "#262626",
        ambientLight: {
            color: "#ffffff",
            intensity: 0.1
        }
    },
    updateScene: () => {},
   });