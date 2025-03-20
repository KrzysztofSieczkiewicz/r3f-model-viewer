import React from "react";
import styles from './../../../../components/sidebar/commons/MenuListItemHeader.module.css';
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";

import { ReactComponent as PointLightIcon } from '../../../../icons/lightTypes/pointLight.svg';
import { VisbilityEyeToggle } from "../../../../components/sidebar/common/VisbilityEyeToggle";
import { AssetProperties } from "../../../../models/assets/Asset";


type Props = {
    isActive: boolean,
    assetId: string,
    assetProperties: AssetProperties,
    toggleExtend: () => void,
}

export const ListedAssetObjectHeader = ( {isActive, assetId, assetProperties, toggleExtend }: Props) => {
    const { updateAssetProperties, } = useSceneObjectsContext();

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
            <p className={styles.displayName}>{assetProperties.name}</p>
            <VisbilityEyeToggle 
                isVisible={assetProperties.visible} 
                updateObject={ (val: boolean) => updateAssetProperties(assetId, {visible: val} )} 
            />
            <span className={styles.extendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}