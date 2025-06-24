import React from "react";
import styles from './AddAssetModal.module.css';

import { ReactComponent as SphereIcon } from '../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as CubeIcon } from '../../../icons/sidebar/cube.svg';

import { AssetModalPrimitivesList } from "./AssetModalPrimitivesList";
import { ButtonLargeRectangle } from "../common/ButtonLargeRectangle";

type Props = {
    closeModal: () => void
}

export const AddAssetModal = ({closeModal}: Props) => {

    return (
        <div className={styles.modalContents}>

            <ButtonLargeRectangle
                onClick={ () => {} }
                displayName="Primitives"
                icon={<SphereIcon/>}
            />
            <ButtonLargeRectangle
                onClick={ () => {} }
                displayName="Models"
                icon={<CubeIcon/>}
            />

            {/* <AssetModalPrimitivesList closeModal={closeModal} /> */}

            {/* 
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
                    icon={<CubeIcon/>}
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
            </ModalDropdownSingle> */}
        </div>
    );
}