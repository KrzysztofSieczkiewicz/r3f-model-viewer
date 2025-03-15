import React from "react";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SphereProperties } from "../../../../models/assets/meshes/Primitive";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { SliderMediumContainer } from "../../controls/sliderContainers/SliderMediumContainer";
import { MultilineSlidersNumeric } from "../../controls/MultilineSlidersNumeric";
import { TraitSingle } from "../../../../features/sideMenu/components/common/traitContainers/TraitSingle";

type Props = {
    assetId: string,
    meshProperties: SphereProperties,
}

export const MeshSphereControls = ({assetId, meshProperties}: Props) => {
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