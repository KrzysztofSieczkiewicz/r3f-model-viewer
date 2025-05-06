import React, { useState } from "react"
import { useSceneObjectsContext } from "../../../../common/contexts/SceneObjectsContext"
import { AssetWrapper } from "../../../../../models/assets/Asset";
import { DropdownItemTrait } from "./DropdownItemTrait";

const unselectedName = "Custom"

type Props = {
    currentTargetID: string|null
}

export const PickerTargetAsset = ({currentTargetID}: Props) => {
    const { assetsList } = useSceneObjectsContext();
    const initialAsset = assetsList.find((asset) => asset.id === currentTargetID)

    const [ selectedAssetID, setSelectedAssetID ] = useState<string|null>(currentTargetID)
    const [ selectedAsset, setSelectedAsset ] = useState<AssetWrapper|undefined>(initialAsset);

    const handleSelectionList = () => {
        const selectionList = assetsList.map( (asset: AssetWrapper) => {return asset.name});
        return selectionList;
    }

    const handleSelectedName = () => {
        if (!selectedAsset) return unselectedName;

        const asset = assetsList.find( (asset) => asset.id === selectedAsset.id)
        if (asset) return asset.name;

        return unselectedName;
    }

    const selectByName = (name: string) => {
        const selected = assetsList.find( (asset) => asset.name === name)
        if (!selected) return;

        setSelectedAssetID(selected.id)
    }

    return (
        <DropdownItemTrait 
            selected={handleSelectedName()} 
            selectionList={handleSelectionList()} 
            handleChange={selectByName} />
    )
}