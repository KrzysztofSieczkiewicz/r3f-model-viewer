import React from "react";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SphereProperties } from "../../../../models/Primitive";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { ExpandableTraits } from "../../commons/traitContainers/ExpandableTraits";
import { SliderMediumContainer } from "../../controls/sliderContainers/SliderMediumContainer";
import { MultilineTraits } from "../../commons/traitContainers/MultilineTraits";

type Props = {
    assetId: string,
    meshProperties: SphereProperties,
}

export const MeshSphereControls = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();

    return (
        <ExpandableTraits name={"Mesh controls"}>
            <SingleLineTrait name="Radius">
                <SliderMediumContainer>
                    <SliderNumeric
                        value={meshProperties.radius}
                        step={0.01}
                        min={0.01}
                        rounding={2}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {radius: val} )} />
                </SliderMediumContainer>
            </SingleLineTrait>

            <MultilineTraits>
                <SingleLineTrait name="Height segments">
                    <SliderMediumContainer>
                        <SliderNumeric
                            value={meshProperties.heightSegments}
                            step={1}
                            min={2}
                            rounding={0}
                            handleChange={(val) => updatePrimitiveProperties(assetId, {heightSegments: val} )} />
                    </SliderMediumContainer>
                </SingleLineTrait>

                <SingleLineTrait name="Width segments">
                    <SliderMediumContainer>
                        <SliderNumeric
                            value={meshProperties.widthSegments}
                            step={1}
                            min={3}
                            rounding={0}
                            handleChange={(val) => updatePrimitiveProperties(assetId, {widthSegments: val} )} />
                    </SliderMediumContainer>
                </SingleLineTrait>
                
            </MultilineTraits>
        </ExpandableTraits>
    );

}