import React from "react";

import { Primitives, PrimitiveWrapper } from "../../../../models/assets/meshes/Primitive";
import { AssetWrapper, Meshes } from "../../../../models/assets/Asset";
import { TraitExpandable } from "../common/traits/TraitExpandable";
import { MeshControlsBox } from "./MeshControlsBox";
import { MeshControlsSphere } from "./MeshControlsSphere";
import { MeshControlsCone } from "./MeshControlsCone";

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
                return <MeshControlsSphere assetId={id} meshProperties={mesh.properties} />
            case Primitives.Cone:
                return <MeshControlsCone assetId={id} meshProperties={mesh.properties} />
            case Primitives.Box:
                return <MeshControlsBox assetId={id} meshProperties={mesh.properties} />
        }
    }

    return (
        <TraitExpandable name={"Mesh"}>
            {handleAssetType()}
        </TraitExpandable>
    );
}