import React from "react";
import { AssetWrapper, Materials } from "../../../../models/assets/Asset";
import { EditableMaterials, EditableMaterialWrapper } from "../../../../models/assets/materials/EditableMaterial";
import { TraitExpandable } from "../common/traitContainers/TraitExpandable";
import { MaterialControlsPhysical } from "./MaterialControlsPhysical";
import { MaterialControlsStandard } from "./MaterialControlsStandard";
import { MaterialControlsPhong } from "./MaterialControlsPhong";

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
                return <MaterialControlsPhysical assetId={asset.id} properties={material.properties} />
            case EditableMaterials.Standard:
                return <MaterialControlsStandard assetId={asset.id} properties={material.properties} />
            case EditableMaterials.Basic:
                return <MaterialControlsPhong assetId={asset.id} properties={material.properties} />
        }
    }

    return (
        <TraitExpandable name={"Material"}>
            {handleMaterialType()}
        </TraitExpandable>
    );
}