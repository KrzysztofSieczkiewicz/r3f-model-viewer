import React from "react";
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { ConeProperties } from "../../../../models/assets/meshes/Primitive";
import { Slider } from "../common/controls/Slider";
import { SliderMediumContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderMediumContainer";
import { SlidersMultiline } from "../common/controls/SlidersMultiline";
import { TraitSingle } from "../common/traits/TraitSingle";

type Props = {
    assetId: string,
    meshProperties: ConeProperties,
}

export const MeshControlsCone = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();

    return (<>
        <TraitSingle name="Radius">
            <SliderMediumContainer>
                <Slider
                    value={meshProperties.radius}
                    step={0.01}
                    min={0.01}
                    rounding={2}
                    handleChange={(val) => updatePrimitiveProperties(assetId, {radius: val} )} />
            </SliderMediumContainer>
        </TraitSingle>
        <TraitSingle name="Height">
            <SliderMediumContainer>
                <Slider
                    value={meshProperties.height}
                    step={0.01}
                    min={0.01}
                    rounding={2}
                    handleChange={(val) => updatePrimitiveProperties(assetId, {height: val} )} />
            </SliderMediumContainer>
        </TraitSingle>

        <SlidersMultiline<ConeProperties>
            displayName="Segments:" 
            values={[ 
                {name: 'Height', property: 'heightSegments', value: meshProperties.heightSegments, min:2, max:100, step:1, rounding:0},
                {name: 'Radial', property: 'radialSegments', value: meshProperties.radialSegments, min:3, max:200, step:1, rounding:0} ]}
            handleChange={(change) => updatePrimitiveProperties(assetId, change)} />
    </>);

}