import React, { useState } from "react";
import styles from './AddAssetModal.module.css'

import { ReactComponent as SphereIcon } from '../../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as ConeIcon } from '../../../../icons/sidebar/primitives/primitive_cone.svg'
import { ReactComponent as CubeIcon } from '../../../../icons/sidebar/cube.svg';

import { ModalListButton } from "../../modal/ModalDropdownOptionButton";
import { Primitives } from "../../../../models/assets/meshes/Primitive";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { ModalDropdownSingle } from "../../modal/ModalDropdownSingle";

type Props = {
    closeModal: () => void
}

export const AddAssetPopup = ({ closeModal }: Props) => {
    const {addAssetPrimitive} = useSceneObjectsContext();

    const [ activeDropdown, setActiveNameDropdown ] = useState("");

    const toggleOpenDropdown = (name: string) => {
        if (activeDropdown === name) {
            setActiveNameDropdown("");
        } else {
            setActiveNameDropdown(name);
        }
    };

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
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Sphere);
                        closeModal();
                    }}/>
                <ModalListButton 
                    displayName="Cone" 
                    icon={<ConeIcon/>}
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Cone);
                        closeModal();
                    }}/>
                <ModalListButton 
                    displayName="Box" 
                    icon={<ConeIcon/>}
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Box);
                        closeModal();
                    }}/>
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
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Sphere);
                        closeModal();
                    }}/>
                <ModalListButton 
                    displayName="Cone" 
                    icon={<ConeIcon/>}
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Cone);
                        closeModal();
                    }}/>
                <ModalListButton 
                    displayName="Box" 
                    icon={<ConeIcon/>}
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Box);
                        closeModal();
                    }}/>
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
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Sphere);
                        closeModal();
                    }}/>
                <ModalListButton 
                    displayName="Cone" 
                    icon={<ConeIcon/>}
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Cone);
                        closeModal();
                    }}/>
                <ModalListButton 
                    displayName="Box" 
                    icon={<ConeIcon/>}
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Box);
                        closeModal();
                    }}/>
            </ModalDropdownSingle>
        </div>
    );
}