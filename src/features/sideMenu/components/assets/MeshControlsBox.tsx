import React from "react";
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { BoxProperties } from "../../../../models/assets/meshes/Primitive";
import { MultilineSlidersNumeric } from "../../../../components/sidebar/controls/MultilineSlidersNumeric";

type Props = {
    assetId: string,
    meshProperties: BoxProperties,
}

export const MeshControlsBox = ({assetId, meshProperties}: Props) => {
    const {updatePrimitiveProperties} = useSceneObjectsContext();

    return (<>
        <MultilineSlidersNumeric<BoxProperties>
            displayName="Size:" 
            values={[ 
                {name: 'Height', property: 'height', value: meshProperties.height, min:0.01, max:100, step:0.01, rounding:2},
                {name: 'Width', property: 'width', value: meshProperties.width, min:0.01, max:100, step:0.01, rounding:2},
                {name: 'Depth', property: 'depth', value: meshProperties.depth, min:0.01, max:100, step:0.01, rounding:2} ]}
            handleChange={(change) => updatePrimitiveProperties(assetId, change)} />
    </>);

}