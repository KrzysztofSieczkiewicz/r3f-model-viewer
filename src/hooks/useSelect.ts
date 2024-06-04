import { useSceneValue } from "../components/contexts/SceneContext"

export const useIsSelected = (id: string) => {
    const [ selectedObjectId ] = useSceneValue((scene) => scene["selectedObjectId"])
    return id === selectedObjectId
}

export const useToggleSelect = (id: string) => {
    const [ selectedObjectId, setScene ] = useSceneValue((scene) => scene["selectedObjectId"])

    const toggleSelection = () => {
        if (id === selectedObjectId) {
            setScene({ selectedObjectId: "" });
        } else {
            setScene({ selectedObjectId: id });
        }
    };

    return toggleSelection;
}