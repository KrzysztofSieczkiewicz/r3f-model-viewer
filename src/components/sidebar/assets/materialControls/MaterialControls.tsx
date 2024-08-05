import React from "react";
import { ExpandableTraits } from "../../commons/traitContainers/ExpandableTraits";
import { AssetWrapper, Materials } from "../../../../models/assets/Asset";
import { EditableMaterials } from "../../../../models/assets/materials/EditableMaterial";
import { PhysicalMaterialControls } from "./PhysicalMaterialControls";

// TODO: WHEN MATERIALS GET EXTENDED BY A ONE MORE LAYER, ADD A TYPE PROP THAT FIRST DETERMINES WHICH KIND OF MATERIAL
// SHOULD BE USED, AND THEN e.g. GET THE PROPER VALUE FROM MATERIAL VAR
type Props = {
    assetId: string,
    asset: AssetWrapper;
}

export const MaterialControls = ({assetId, asset}: Props) => {

    const handleMaterialType = () => {
        switch(asset.materialType) {
            case Materials.Editable:
                return handleEditableMaterialType(asset.material.type)
        }
    }

    const handleEditableMaterialType = (type: EditableMaterials) => {
        switch(type) {
            case EditableMaterials.Physical:
                return <PhysicalMaterialControls />
        }
    }

    return (
        <ExpandableTraits name={"Material"}>
            <></>
            {/* {handleAssetType()} */}
        </ExpandableTraits>
    );
}