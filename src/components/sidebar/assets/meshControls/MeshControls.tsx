import React from "react";
import { Assets } from "../../../../models/Asset";
import { Primitives, PrimitiveWrapper } from "../../../../models/Primitive"
import { MeshConeControls } from "./MeshConeControls";
import { MeshSphereControls } from "./MeshSphereControls";

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
                return <MeshSphereControls assetId={assetId} meshProperties={mesh.properties}/>
            case Primitives.Cone:
                return <MeshConeControls assetId={assetId} meshProperties={mesh.properties}/>
        }
    }

    return (<>
        {handleAssetType()}
    </>);
}