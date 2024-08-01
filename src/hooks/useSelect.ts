import { useSceneValue } from "../components/contexts/SceneContext"

export const useIsSelected = (id: string) => {
    const [ selectedObjectId ] = useSceneValue((scene) => scene["selectedObject"])
    return id === selectedObjectId
}

export const useToggleSelect = (id: string) => {
    const [ selectedObjectId, setScene ] = useSceneValue((scene) => scene["selectedObject"])

    const toggleSelection = () => {
        if (id === selectedObjectId) {
            setScene({ selectedObject: "" });
        } else {
            setScene({ selectedObject: id });
        }
    };

    return toggleSelection;
}