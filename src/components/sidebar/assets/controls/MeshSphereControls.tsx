import React from "react";
import { ItemTrait } from "../../commons/ItemTrait";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SphereProperties } from "../../../../models/Primitive";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { SliderSingleContainer } from "../../controls/sliderContainers/SliderSingleContainer";

type Props = {
    assetId: string,
    meshProperties: SphereProperties,
}

export const MeshSphereControls = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();

    return (
        <div>
            <ItemTrait name="Radius">
                <SliderSingleContainer>
                    <SliderNumeric
                        value={meshProperties.radius}
                        step={0.01}
                        rounding={2}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {radius: val} )} />
                </SliderSingleContainer>
            </ItemTrait>

            <ItemTrait name="Height segments">
                <SliderSingleContainer>
                    <SliderNumeric
                        value={meshProperties.heightSegments}
                        step={1}
                        rounding={0}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {heightSegments: val} )} />
                </SliderSingleContainer>
            </ItemTrait>

            <ItemTrait name="Width segments">
                <SliderSingleContainer>
                    <SliderNumeric
                        value={meshProperties.widthSegments}
                        step={1}
                        rounding={0}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {widthSegments: val} )} />
                </SliderSingleContainer>
            </ItemTrait>
        </div>
    );

}