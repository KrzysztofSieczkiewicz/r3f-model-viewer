import React, { useState } from "react"
import { useSceneObjectsContext } from "../../../../common/contexts/SceneObjectsContext"
import { AssetWrapper } from "../../../../../models/assets/Asset";
import { DropdownItemTrait } from "./DropdownItemTrait";

const unselectedName = "Custom"

type Props = {
    value: string|undefined,
    onChange: (id: string|undefined) => void,
}

export const PickerTargetAsset = ({value, onChange}: Props) => {
    const { assetsList } = useSceneObjectsContext();

    const handleSelectionList = () => {
        const selectionList = assetsList.map( (asset: AssetWrapper) => {return asset.name});
        return selectionList;
    }

    const handleSelectedName = () => {
        if (!value) return unselectedName;

        const asset = assetsList.find( (asset) => asset.id === value)
        if (asset) return asset.name;

        return unselectedName;
    }


    return (
        <DropdownItemTrait 
            selected={handleSelectedName()} 
            selectionList={handleSelectionList()} 
            handleSelect={onChange} />
    )
}