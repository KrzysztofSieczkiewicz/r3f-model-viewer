import { useGLTF } from "@react-three/drei";
import React from "react";
import { RenderedAsset } from "./RenderedAsset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { RenderedPrimitive } from "./primitives/RenderedPrimitive";
import { SphereProperties } from "../../../models/Primitive";

export const Assets = () => {
    const { assetsList } = useSceneObjectsContext();
        
    return (
        assetsList.map((asset) => {
            if(!asset.properties.visible) return <></>;
            return (
                <RenderedPrimitive
                    properties={asset.mesh.properties as SphereProperties} />
                // <RenderedAsset 
                //     key={asset.id}
                //     asset={asset}
                // />
            );
        })
    );

}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");