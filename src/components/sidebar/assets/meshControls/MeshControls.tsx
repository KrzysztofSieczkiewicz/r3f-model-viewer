import React from "react";
import { Assets } from "../../../../models/assets/Asset";
import { Primitives, PrimitiveWrapper } from "../../../../models/assets/meshes/Primitive"
import { MeshConeControls } from "./MeshConeControls";
import { MeshSphereControls } from "./MeshSphereControls";
import { MeshBoxControls } from "./MeshBoxControls";

type Props = {
    assetId: string,
    type: Assets,
    mesh: PrimitiveWrapper;
}

export const MeshControls = ( {assetId, type, mesh}: Props) => {

    const handleAssetType = () => {
        return handlePrimitiveType();
        /*
        switch(type) {
            case Assets.Primitive:
                return handlePrimitiveType();
            case Assets.Unwrapped:
                // TODO: ADD UNWRAPPED MODELS HANDLING
            case Assets.Scan:
                // TODO: ADD SCANNED MODELS HANDLING
        }
        */
    }

    const handlePrimitiveType = () => {
        switch(mesh.type) {
            case Primitives.Sphere:
                return <MeshSphereControls assetId={assetId} meshProperties={mesh.properties} />
            case Primitives.Cone:
                return <MeshConeControls assetId={assetId} meshProperties={mesh.properties} />
            case Primitives.Box:
                return <MeshBoxControls assetId={assetId} meshProperties={mesh.properties} />
        }
    }

    return (<>
        {handleAssetType()}
    </>);
}