import React from "react";
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { SphereProperties } from "../../../../models/assets/meshes/Primitive";
import { SliderNumeric } from "../common/controls/SliderNumeric";
import { SliderMediumContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderMediumContainer";
import { MultilineSlidersNumeric } from "../../../../components/sidebar/controls/MultilineSlidersNumeric";
import { TraitSingle } from "../common/traits/TraitSingle";

type Props = {
    assetId: string,
    meshProperties: SphereProperties,
}

export const MeshControlsSphere = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();

    return (<>
        <TraitSingle name="Radius">
            <SliderMediumContainer>
                <SliderNumeric
                    value={meshProperties.radius}
                    step={0.01}
                    min={0.01}
                    rounding={2}
                    handleChange={(val) => updatePrimitiveProperties(assetId, {radius: val} )} />
            </SliderMediumContainer>
        </TraitSingle>

        <MultilineSlidersNumeric<SphereProperties>
            displayName="Segments:" 
            values={[ 
                {name: 'Height', property: 'heightSegments', value: meshProperties.heightSegments, min:2, max:100, step:1, rounding:0},
                {name: 'Width', property: 'widthSegments', value: meshProperties.widthSegments, min:3, max:200, step:1, rounding:0} ]}
            handleChange={(change) => updatePrimitiveProperties(assetId, change)} />
    </>);

}