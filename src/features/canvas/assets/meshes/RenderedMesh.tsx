import React from "react";
import { AssetWrapper, Meshes } from "../../../../models/assets/Asset";
import { PrimitiveMesh } from "./PrimitiveMesh";
import { UnwrappedMesh } from "./UnwrappedMesh";

export const RenderedMesh: React.FC<{ asset: AssetWrapper; children?: React.ReactNode }> = ({ asset, children }) => {
        switch (asset.meshType) {
            case Meshes.Primitive:
                return <PrimitiveMesh asset={asset}>{children}</PrimitiveMesh>;

            case Meshes.Unwrapped:
                return <UnwrappedMesh asset={asset}>{children}</UnwrappedMesh>;

            default:
                return null;
        }
    };