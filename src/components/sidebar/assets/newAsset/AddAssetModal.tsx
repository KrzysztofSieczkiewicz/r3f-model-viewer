import React, { useState } from "react";
import styles from './AddAssetModal.module.css'

import { ReactComponent as SphereIcon } from '../../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as ConeIcon } from '../../../../icons/sidebar/primitives/primitive_cone.svg'
import { PopupListItem } from "./PopupListItem";
import { Primitives } from "../../../../models/Primitive";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { PopupButtonLarge } from "../../modal/PopupButtonLarge";

type Props = {
    closeModal: () => void
}

export const AddAssetPopup = ({ closeModal }: Props) => {
    const {addAssetPrimitive} = useSceneObjectsContext();

    const [ activeName, setActiveName ] = useState("");

    const toggleOpen = (name: string) => {
        if (activeName === name) {
            setActiveName("");
        } else {
            setActiveName(name);
        }
    };

    return (
        <div className={styles.modal}>
            <PopupButtonLarge
                isOpen={activeName === "Primitives"}
                toggleOpen={() => toggleOpen("Primitives")}
                displayName="Primitives"
            >
                <PopupListItem 
                    displayName="Sphere" 
                    icon={<SphereIcon className={styles.listIcon}/>} 
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Sphere)
                        closeModal();
                    }
                }/>
                <PopupListItem 
                    displayName="Cone" 
                    icon={<ConeIcon className={styles.listIcon}/>}
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Cone)
                        closeModal();
                    }
                    }/>
                <PopupListItem 
                    displayName="Box" 
                    icon={<ConeIcon className={styles.listIcon}/>}
                    onClick={ () => {
                        addAssetPrimitive(Primitives.Box)
                        closeModal();
                    }
                    }/>
            </PopupButtonLarge>
        </div>
    );
}