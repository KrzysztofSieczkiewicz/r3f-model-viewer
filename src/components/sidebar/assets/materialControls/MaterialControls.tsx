import React from "react";
import { ExpandableTraits } from "../../commons/traitContainers/ExpandableTraits";
import { AssetWrapper, Materials } from "../../../../models/assets/Asset";
import { EditableMaterials, EditableMaterialWrapper } from "../../../../models/assets/materials/EditableMaterial";
import { PhysicalMaterialControls } from "./PhysicalMaterialControls";

// TODO: WHEN MATERIALS GET EXTENDED BY A ONE MORE LAYER, ADD A TYPE PROP THAT FIRST DETERMINES WHICH KIND OF MATERIAL
// SHOULD BE USED, AND THEN e.g. GET THE PROPER VALUE FROM MATERIAL VAR
type Props = {
    asset: AssetWrapper;
}

export const MaterialControls = ({asset}: Props) => {

    const handleMaterialType = () => {
        switch(asset.materialType) {
            case Materials.Editable:
                return handleEditableMaterialType(asset.material)
        }
    }

    const handleEditableMaterialType = (material: EditableMaterialWrapper) => {
        switch(material.type) {
            case EditableMaterials.Physical:
                return <PhysicalMaterialControls assetId={asset.id} properties={material.properties}/>
        }
    }

    return (
        <ExpandableTraits name={"Material"}>
            {handleMaterialType()}
        </ExpandableTraits>
    );
}