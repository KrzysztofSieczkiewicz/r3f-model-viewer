import React, { useState } from "react";
import { ItemTrait } from "../../commons/ItemTrait";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SphereProperties } from "../../../../models/Primitive";
import { SliderNumeric } from "../../controls/SliderNumeric";

type Props = {
    assetId: string,
    meshProperties: SphereProperties,
}

export const MeshSphereControls = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();
    const [ axesLocked, setAxesLocked] = useState(false);

    return (
        <div>
            <ItemTrait name="Position">
                <SliderNumeric
                    value={meshProperties.radius}
                    step={0.005}
                    rounding={0}
                    handleChange={(val) => updatePrimitiveProperties(assetId, {radius: val} )} />
            </ItemTrait>

            <ItemTrait name="Rotation">
                <SliderNumeric
                    value={meshProperties.heightSegments}
                    step={0.01}
                    rounding={0}
                    handleChange={(val) => updatePrimitiveProperties(assetId, {heightSegments: val} )} />
            </ItemTrait>

            <ItemTrait name="Scale">
                <SliderNumeric
                    value={meshProperties.widthSegments}
                    step={0.01}
                    rounding={0}
                    handleChange={(val) => updatePrimitiveProperties(assetId, {widthSegments: val} )} />
            </ItemTrait>
        </div>
    );

}