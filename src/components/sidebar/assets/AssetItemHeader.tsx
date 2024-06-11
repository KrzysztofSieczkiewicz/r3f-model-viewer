import React from "react";
import styles from './Assets.module.css';
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { VisibilityButton } from "../common/VisibilityButton";
import { AssetWrapper } from "../../../models/Asset";


type Props = {
    isActive: boolean,
    asset: AssetWrapper
    toggleExtend: () => void,
}

export const AssetItemHeader = ( {isActive, asset, toggleExtend }: Props) => {
    const { updateAsset, } = useSceneObjectsContext();

    const renderArrow = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    // TODO: Replace PointLightIcon with proper asset icon
    return (
        <div 
            className={styles.assetHeader}
            onClick={toggleExtend}
            >
            <PointLightIcon className={styles.assetIcon} />
            <p className={styles.assetName}>{asset.name}</p>
            <VisibilityButton 
                isVisible={asset.visible} 
                updateObject={ (val: boolean) => updateAsset(asset.id, {visible: val} )} 
            />
            <span className={styles.extendIcon}>{ renderArrow() }</span>
        </div>
    );
}