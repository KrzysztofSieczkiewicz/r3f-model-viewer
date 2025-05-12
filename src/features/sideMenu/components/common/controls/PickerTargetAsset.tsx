import React, { useState } from "react"
import { useSceneObjectsContext } from "../../../../common/contexts/SceneObjectsContext"
import { AssetWrapper } from "../../../../../models/assets/Asset";
import { DropdownItemTrait } from "./DropdownItemTrait";

const unselectedName = "Custom"

// TODO - finish this- DropdownItemTrait is using index instead of name now

type Props = {
    value: string|undefined,
    onChange: (id: string|undefined) => void,
}

export const PickerTargetAsset = ({value, onChange}: Props) => {
    const { assetsList } = useSceneObjectsContext();

    const [ isTargeting, setIsTargeting ] = useState<boolean>(value !== undefined)

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

    const handleSelectById = (index: number) => {
        onChange( assetsList[index].id )
    }

    return (
        <DropdownItemTrait 
            selected={handleSelectedName()} 
            selectionList={handleSelectionList()} 
            handleSelect={handleSelectById} />
    )
}