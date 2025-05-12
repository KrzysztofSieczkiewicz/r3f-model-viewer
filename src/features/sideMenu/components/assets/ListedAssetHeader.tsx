import React from "react";
import styles from './../common/submenus/Submenu.module.css';

import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";
import { ReactComponent as PointLightIcon } from '../../../../icons/lightTypes/pointLight.svg';
import { ButtonToggleVisibility } from "../common/controls/ButtonToggleVisibility";
import { AssetWrapper } from "../../../../models/assets/Asset";


type Props = {
    isActive: boolean,
    asset: AssetWrapper,
    toggleExtend: () => void,
}

export const ListedAssetHeader = ( {isActive, asset, toggleExtend }: Props) => {
    const { updateAssetProperties, } = useSceneObjectsContext();

    const handleArrowDirection = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    // TODO: Replace PointLightIcon with separate AssetTypeIcon component that will accept asset type and return matching (or default) asset type icon
    // see LightTypeIcon for reference
    return (
        <div
            style={{gridTemplateColumns: '1fr 5fr 1fr 1fr'}}
            className={styles.listedItemHeader}
            onClick={toggleExtend}
        >
            <PointLightIcon className={styles.listedItemIcon} />
            <p className={styles.listedItemDisplayName}>{asset.name}</p>
            <ButtonToggleVisibility 
                isVisible={asset.properties.visible} 
                updateObject={ (val: boolean) => updateAssetProperties(asset.id, {visible: val} )} 
            />
            <span className={styles.listedItemExtendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}