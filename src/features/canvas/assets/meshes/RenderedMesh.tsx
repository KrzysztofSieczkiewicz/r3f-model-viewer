import React from "react";
import { Meshes } from "../../../../models/assets/Asset";
import { PrimitiveMesh } from "./PrimitiveMesh";
import { UnwrappedMesh } from "./UnwrappedMesh";

export const RenderedMesh: React.FC<{ assetID: string; meshType: Meshes; children?: React.ReactNode }> = ({ assetID, meshType, children }) => {
        switch (meshType) {
            case Meshes.Primitive:
                return <PrimitiveMesh assetID={assetID}>{children}</PrimitiveMesh>;

            case Meshes.Unwrapped:
                return <UnwrappedMesh assetID={assetID}>{children}</UnwrappedMesh>;

            default:
                return null;
        }
    };