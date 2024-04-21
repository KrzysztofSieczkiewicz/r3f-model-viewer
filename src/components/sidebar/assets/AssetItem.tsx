import React from 'react';
import styles from './Assets.module.css'
import { useSidebarControlsContext } from '../SidebarControlsContext'

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from '../../../models/Asset';
import { VisibilityEyeButton } from '../common/VisibilityEyeButton';
import { SlidersArray } from '../common/SlidersArray';


type Props = {
    active: boolean,
    asset: AssetWrapper
    onClick: () => void
}

type SlidersArrayProps = {
    displayName: string,
    propertyName: keyof AssetWrapper
    propertyValue: [number, number, number],
    step: number,
}

// TODO [TUTORING]: SHOULD I WRAP FUNCTIONS PASSED TO THE CHILDREN WITH useMemo()/useCallback()?
export const AssetItem = ( {active, asset, onClick}: Props) => {

    const { updateAssetProperty } = useSidebarControlsContext();

    const handleAssetName = () => {
        return asset.name.charAt(0).toUpperCase() + asset.name.slice(1);
    }

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    const renderSlidersArray = ( props: SlidersArrayProps): JSX.Element => {
        return (
            <SlidersArray 
                name={props.displayName}
                value={props.propertyValue}
                step={props.step}
                handleChange={(val: [number,number,number]) => updateAssetProperty(asset.id, props.propertyName, val)}
            />
        );
    }

    return (
        <div className={active ? `${styles.assetContainer} ${styles.active}` : styles.assetContainer}>
            <div className={styles.assetHeader}
                onClick={onClick}
            >
                <PointLightIcon className={styles.assetIcon} />
                <p className={styles.assetName}>{ handleAssetName() }</p>
                <VisibilityEyeButton object={asset} updateProperty={updateAssetProperty} />
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>

            {active && <div className={styles.assetBody}>
                {renderSlidersArray({displayName: 'Position', propertyName:'position', propertyValue: asset.position, step: 0.005})}
                {renderSlidersArray({displayName: 'Rotation', propertyName:'rotation', propertyValue: asset.rotation, step: 0.01})}
                {renderSlidersArray({displayName: 'Scale', propertyName:'scale', propertyValue: asset.scale, step: 0.01})}

            </div>}
        </div>
    );
}