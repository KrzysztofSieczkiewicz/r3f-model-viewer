import React from "react"
import { ModalListedButton } from "../common/ModalListedButton"
import { Primitives } from "../../../models/assets/meshes/Primitive";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";

import { ReactComponent as SphereIcon } from '../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as ConeIcon } from '../../../icons/sidebar/primitives/primitive_cone.svg'
import { ReactComponent as CubeIcon } from '../../../icons/sidebar/cube.svg';

type Props = {
    closeModal: () => void
}

export const AssetModalPrimitivesList = ({closeModal}: Props) => {

    const { addAssetPrimitive } = useSceneObjectsContext();

    const addPrimitiveAndClose = (assetType: Primitives) => {
        addAssetPrimitive(assetType);
        closeModal();
    }

    return (
        <div>
            <ModalListedButton 
                displayName="Sphere"
                icon={<SphereIcon/>}
                onClick={ () => addPrimitiveAndClose(Primitives.Sphere)} />
            <ModalListedButton 
                displayName="Cone" 
                icon={<ConeIcon/>}
                onClick={ () => addPrimitiveAndClose(Primitives.Cone)} />
            <ModalListedButton 
                displayName="Box" 
                icon={<CubeIcon/>}
                onClick={ () => addPrimitiveAndClose(Primitives.Box)}/>
        </div>
    )
}