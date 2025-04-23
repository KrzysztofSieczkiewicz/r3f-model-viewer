import React from "react";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";
import { ConeProperties } from "../../../../models/assets/meshes/Primitive";
import { Slider } from "../common/controls/Slider";
import { SliderContainerMedium } from "../common/controls/SliderContainerMedium";
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
            <SliderContainerMedium>
                <Slider
                    value={meshProperties.radius}
                    step={0.01}
                    min={0.01}
                    rounding={2}
                    handleChange={(val) => updatePrimitiveProperties(assetId, {radius: val} )} />
            </SliderContainerMedium>
        </TraitSingle>
        <TraitSingle name="Height">
            <SliderContainerMedium>
                <Slider
                    value={meshProperties.height}
                    step={0.01}
                    min={0.01}
                    rounding={2}
                    handleChange={(val) => updatePrimitiveProperties(assetId, {height: val} )} />
            </SliderContainerMedium>
        </TraitSingle>

        <SlidersMultiline<ConeProperties>
            displayName="Segments:" 
            values={[ 
                {name: 'Height', property: 'heightSegments', value: meshProperties.heightSegments, min:2, max:100, step:1, rounding:0},
                {name: 'Radial', property: 'radialSegments', value: meshProperties.radialSegments, min:3, max:200, step:1, rounding:0} ]}
            handleChange={(change) => updatePrimitiveProperties(assetId, change)} />
    </>);

}