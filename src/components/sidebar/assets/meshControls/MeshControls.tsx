import React from "react";
import { Primitives, PrimitiveWrapper } from "../../../../models/assets/meshes/Primitive"
import { MeshConeControls } from "./MeshConeControls";
import { MeshSphereControls } from "./MeshSphereControls";
import { MeshBoxControls } from "./MeshBoxControls";
import { AssetWrapper, Meshes } from "../../../../models/assets/Asset";
import { TraitExpandable } from "../../../../features/sideMenu/components/common/traitContainers/TraitExpandable";

type Props = {
    asset: AssetWrapper;
}

export const MeshControls = ( {asset}: Props) => {

    const handleAssetType = () => {
        switch(asset.meshType) {
            case Meshes.Primitive:
                return handlePrimitiveType(asset.id, asset.mesh);
            // case Assets.Unwrapped:
            //     // TODO: ADD UNWRAPPED MODELS HANDLING
            // case Assets.Scan:
            //     // TODO: ADD SCANNED MODELS HANDLING
        }
    }

    const handlePrimitiveType = (id: string, mesh: PrimitiveWrapper) => {
        switch(mesh.type) {
            case Primitives.Sphere:
                return <MeshSphereControls assetId={id} meshProperties={mesh.properties} />
            case Primitives.Cone:
                return <MeshConeControls assetId={id} meshProperties={mesh.properties} />
            case Primitives.Box:
                return <MeshBoxControls assetId={id} meshProperties={mesh.properties} />
        }
    }

    return (
        <TraitExpandable name={"Mesh"}>
            {handleAssetType()}
        </TraitExpandable>
    );
}