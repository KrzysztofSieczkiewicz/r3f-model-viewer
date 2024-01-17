import { Dispatch, createContext } from "react"
import { AssetWrapper } from "../../interfaces/asset.model"
import { LightWrapper } from "../../interfaces/light.model"
import { SceneWrapper } from "../../interfaces/scene.model"

type SidebarControlsContextType = {
    lightsList: LightWrapper[],
    setLightsList: Dispatch<React.SetStateAction<LightWrapper[]>>,

    assetsList: AssetWrapper[],
    setAssetsList: Dispatch<React.SetStateAction<AssetWrapper[]>>,

    scene: SceneWrapper,
    setScene: Dispatch<React.SetStateAction<SceneWrapper>>,
}

// TODO: handle default here
export const SidebarControlsContext = createContext<SidebarControlsContextType>({
    lightsList: [],
    setLightsList: () => [],
    assetsList: [],
    setAssetsList: () => [],
    scene: {
        backgroundColor: '',
        ambientLight: {
            color: '',
            intensity: 0,
        },
    },
    setScene: () => {},
   });