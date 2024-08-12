import React from "react";
import { ExpandableTraits } from "../../commons/traitContainers/ExpandableTraits";
import { AssetWrapper, Materials } from "../../../../models/assets/Asset";
import { EditableMaterials, EditableMaterialWrapper } from "../../../../models/assets/materials/EditableMaterial";
import { PhysicalMaterialControls } from "./PhysicalMaterialControls";
import { StandardMaterialControls } from "./StandardMaterialControls";
import { PhongMaterialControls } from "./PhongMaterialControls";

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
                return <PhysicalMaterialControls assetId={asset.id} properties={material.properties} />
            case EditableMaterials.Standard:
                return <StandardMaterialControls assetId={asset.id} properties={material.properties} />
            case EditableMaterials.Basic:
                return <PhongMaterialControls assetId={asset.id} properties={material.properties} />
        }
    }

    return (
        <ExpandableTraits name={"Material"}>
            {handleMaterialType()}
        </ExpandableTraits>
    );
}