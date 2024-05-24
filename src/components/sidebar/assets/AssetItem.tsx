import React from 'react';
import styles from './Assets.module.css'

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from '../../../models/Asset';
import { VisibilityButton } from '../common/VisibilityButton';
import { PositionSliders } from '../common/PositionSliders';
import { RotationSliders } from '../common/RotationSliders';
import { ScaleSliders } from '../common/ScaleSliders';
import { DeleteItemButton } from '../common/DeleteItemButton';

type Props = {
    isActive: boolean,
    isVisible: boolean,
    name: string,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],

    onClick: () => void,
    updateAsset: (change: Partial<AssetWrapper>) => void,
    deleteAsset: () => void
}

export const AssetItem = ( {isActive, isVisible, name,  position, rotation, scale, onClick, updateAsset, deleteAsset}: Props) => {

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
                    updateObject={ (val: boolean) => updateAsset( {visible: val} )} 
                />
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>

            {isActive && <div className={styles.assetBody}>

                <span className={styles.deleteButtonContainer}>
                    <DeleteItemButton deleteObject={() => deleteAsset()}/>
                </span>

                <PositionSliders 
                    name="Position"
                    value={position}
                    step={0.005}
                    handleChange={(val) => updateAsset( {position: val} )}
                />
                <RotationSliders 
                    name="Rotation"
                    value={rotation}
                    step={0.01}
                    handleChange={(val) => updateAsset( {rotation: val} )}
                />
                <ScaleSliders 
                    name="Scale"
                    value={scale}
                    step={0.01}
                    handleChange={(val) => updateAsset( {scale: val} )}
                />
            </div>}
        </div>
    );
}