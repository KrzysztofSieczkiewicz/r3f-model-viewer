import React from "react";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SphereProperties } from "../../../../models/Primitive";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { ExpandableTraits } from "../../commons/traitContainers/ExpandableTraits";

type Props = {
    assetId: string,
    meshProperties: SphereProperties,
}

export const MeshSphereControls = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();

    return (
        <ExpandableTraits name={"Mesh controls"}>
            <SingleLineTrait name="Radius">
                <SliderLongContainer>
                    <SliderNumeric
                        value={meshProperties.radius}
                        step={0.01}
                        min={0.01}
                        rounding={2}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {radius: val} )} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Height segments">
                <SliderLongContainer>
                    <SliderNumeric
                        value={meshProperties.heightSegments}
                        step={1}
                        min={2}
                        rounding={0}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {heightSegments: val} )} />
                </SliderLongContainer>
            </SingleLineTrait>

            <SingleLineTrait name="Width segments">
                <SliderLongContainer>
                    <SliderNumeric
                        value={meshProperties.widthSegments}
                        step={1}
                        min={3}
                        rounding={0}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {widthSegments: val} )} />
                </SliderLongContainer>
            </SingleLineTrait>
        </ExpandableTraits>
    );

}