import React, { useState } from "react";
import styles from './AddAssetModal.module.css'

import { ReactComponent as SphereIcon } from '../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as ConeIcon } from '../../../icons/sidebar/primitives/primitive_cone.svg'
import { ReactComponent as CubeIcon } from '../../../icons/sidebar/cube.svg';

import { useSceneObjectsContext } from "../../../components/contexts/SceneObjectsContext";
import { ModalDropdownSingle } from "../../../components/sidebar/modal/ModalDropdownSingle";
import { ModalListButton } from "../../../components/sidebar/modal/ModalDropdownOptionButton";
import { Primitives } from "../../../models/assets/meshes/Primitive";

// TODO: find a way to center this modal to a middle of the screen
type Props = {
    closeModal: () => void
}

export const AddAssetModal = ({ closeModal }: Props) => {
    const {addAssetPrimitive} = useSceneObjectsContext();

    const [ activeDropdown, setActiveNameDropdown ] = useState("");

    const toggleOpenDropdown = (name: string) => {
        if (activeDropdown === name) {
            setActiveNameDropdown("");
        } else {
            setActiveNameDropdown(name);
        }
    };

    const addPrimitiveAndClose = (assetType: Primitives) => {
        addAssetPrimitive(assetType);
        closeModal();
    }


    return (
        <div className={styles.modalContents}>
            <ModalDropdownSingle
                isOpen={activeDropdown === "Primitives"}
                toggleOpen={() => toggleOpenDropdown("Primitives")}
                displayName="Primitives"
                icon={<CubeIcon/>} 
            >
                <ModalListButton 
                    displayName="Sphere"
                    icon={<SphereIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Sphere)} />
                <ModalListButton 
                    displayName="Cone" 
                    icon={<ConeIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Cone)} />
                <ModalListButton 
                    displayName="Box" 
                    icon={<ConeIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Box)}/>
            </ModalDropdownSingle>
            
            <ModalDropdownSingle
                isOpen={activeDropdown === "Scans"}
                toggleOpen={() => toggleOpenDropdown("Scans")}
                displayName="Scans"
                icon={<SphereIcon/>} 
            >
                <ModalListButton 
                    displayName="Sphere"
                    icon={<SphereIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Sphere)} />
                <ModalListButton 
                    displayName="Cone" 
                    icon={<ConeIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Cone)} />
                <ModalListButton 
                    displayName="Box" 
                    icon={<ConeIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Box)}/>
            </ModalDropdownSingle>

            <ModalDropdownSingle
                isOpen={activeDropdown === "Models"}
                toggleOpen={() => toggleOpenDropdown("Models")}
                displayName="Models"
                icon={<ConeIcon/>} 
            >
                <ModalListButton 
                    displayName="Sphere"
                    icon={<SphereIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Sphere)} />
                <ModalListButton 
                    displayName="Cone" 
                    icon={<ConeIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Cone)} />
                <ModalListButton 
                    displayName="Box" 
                    icon={<ConeIcon/>}
                    onClick={ () => addPrimitiveAndClose(Primitives.Box)}/>
            </ModalDropdownSingle>
        </div>
    );
}