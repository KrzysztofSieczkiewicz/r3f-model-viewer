import React from 'react';
import styles from './Assets.module.css'

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from '../../../models/Asset';
import { VisibilityButton } from '../common/VisibilityButton';
import { PositionSliders } from '../common/PositionSliders';
import { RotationSliders } from '../common/RotationSliders';
import { ScaleSliders } from '../common/ScaleSliders';

type Props = {
    id: string,
    isActive: boolean,
    isVisible: boolean,
    name: string,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],

    onClick: () => void,
    updateAsset: (id: string, change: Partial<AssetWrapper>) => void
}

export const AssetItem = ( {id, isActive, isVisible, name,  position, rotation, scale, onClick, updateAsset}: Props) => {

    const handleIsActive = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={isActive ? `${styles.assetContainer} ${styles.active}` : styles.assetContainer}>
            <div className={styles.assetHeader}
                onClick={onClick}
            >
                <PointLightIcon className={styles.assetIcon} />
                <p className={styles.assetName}>{name}</p>
                <VisibilityButton 
                    isVisible={isVisible} 
                    updateObject={ (val: boolean) => updateAsset( id, {visible: val} )} 
                />
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>

            {isActive && <div className={styles.assetBody}>
                <PositionSliders 
                    name="Position"
                    value={position}
                    step={0.005}
                    handleChange={(val) => updateAsset( id, {position: val} )}
                />
                <RotationSliders 
                    name="Rotation"
                    value={rotation}
                    step={0.01}
                    handleChange={(val) => updateAsset( id, {rotation: val} )}
                />
                <ScaleSliders 
                    name="Scale"
                    value={scale}
                    step={0.01}
                    handleChange={(val) => updateAsset( id, {scale: val} )}
                />
            </div>}
        </div>
    );
}