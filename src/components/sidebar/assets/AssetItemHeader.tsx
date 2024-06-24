import React from "react";
import styles from './../commons/MenuListItemHeader.module.css';
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { VisbilityEyeToggle } from "../common/VisbilityEyeToggle";
import { AssetWrapper } from "../../../models/Asset";


type Props = {
    isActive: boolean,
    asset: AssetWrapper
    toggleExtend: () => void,
}

export const AssetItemHeader = ( {isActive, asset, toggleExtend }: Props) => {
    const { updateAsset, } = useSceneObjectsContext();

    const handleArrowDirection = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    // TODO: Replace PointLightIcon with proper asset icon
    return (
        <div
            style={{gridTemplateColumns: '1fr 5fr 1fr 1fr'}}
            className={styles.header}
            onClick={toggleExtend}
        >
            <PointLightIcon className={styles.typeIcon} />
            <p className={styles.displayName}>{asset.name}</p>
            <VisbilityEyeToggle 
                isVisible={asset.visible} 
                updateObject={ (val: boolean) => updateAsset(asset.id, {visible: val} )} 
            />
            <span className={styles.extendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}