import React from "react";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { ConeProperties } from "../../../../models/assets/meshes/Primitive";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { ExpandableTraits } from "../../commons/traitContainers/ExpandableTraits";
import { SliderMediumContainer } from "../../controls/sliderContainers/SliderMediumContainer";
import { MultilineSlidersNumeric } from "../../controls/MultilineSlidersNumeric";

type Props = {
    assetId: string,
    meshProperties: ConeProperties,
}

export const MeshConeControls = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();

    return (
        <ExpandableTraits name={"Mesh"}>
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
            <SingleLineTrait name="Height">
                <SliderMediumContainer>
                    <SliderNumeric
                        value={meshProperties.height}
                        step={0.01}
                        min={0.01}
                        rounding={2}
                        handleChange={(val) => updatePrimitiveProperties(assetId, {height: val} )} />
                </SliderMediumContainer>
            </SingleLineTrait>

            <MultilineSlidersNumeric<ConeProperties>
                displayName="Segments:" 
                values={[ 
                    {name: 'Height', property: 'heightSegments', value: meshProperties.heightSegments, min:2, max:100, step:1, rounding:0},
                    {name: 'Radial', property: 'radialSegments', value: meshProperties.radialSegments, min:3, max:200, step:1, rounding:0} ]}
                handleChange={(change) => updatePrimitiveProperties(assetId, change)} />
        </ExpandableTraits>
    );

}