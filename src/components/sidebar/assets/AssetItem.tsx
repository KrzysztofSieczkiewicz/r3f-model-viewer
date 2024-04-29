import React from 'react';
import styles from './Assets.module.css'
import { useSidebarControlsContext } from '../SidebarControlsContext'

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from '../../../models/Asset';
import { VisibilityButton } from '../common/VisibilityButton';
import { PositionSliders } from '../common/PositionSliders';
import { RotationSliders } from '../common/RotationSliders';
import { ScaleSliders } from '../common/ScaleSliders';
import { useSceneObjectsContext } from '../SceneObjectsContext';


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

// TODO: MOVE THE asset OBJECT UP, AND SEPARATE VALUES SO THE ATTRIBUTES WONT RERENDER EACH OTHER
export const AssetItem = ( {active, asset, onClick}: Props) => {
    const { updateAsset } = useSceneObjectsContext();

    const handleAssetName = () => {
        return asset.name.charAt(0).toUpperCase() + asset.name.slice(1);
    }

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    const renderPositionSliders = ( props: SlidersArrayProps): JSX.Element => {
        return (
            <PositionSliders 
                name={props.displayName}
                value={props.propertyValue}
                step={props.step}
                handleChange={(val: [number,number,number]) => updateAsset( {...structuredClone(asset), position: val} )}
            />
        );
    }

    const renderRotationSliders = ( props: SlidersArrayProps): JSX.Element => {
        return (
            <RotationSliders 
                name={props.displayName}
                value={props.propertyValue}
                step={props.step}
                handleChange={(val: [number,number,number]) => updateAsset( {...structuredClone(asset), rotation: val} )}
            />
        );
    }

    const renderScaleSliders = ( props: SlidersArrayProps): JSX.Element => {
        return (
            <ScaleSliders 
                name={props.displayName}
                value={props.propertyValue}
                step={props.step}
                handleChange={(val: [number,number,number]) => updateAsset( {...structuredClone(asset), scale: val} )}
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
                <VisibilityButton 
                    object={asset} 
                    updateObject={ (val: boolean) => updateAsset( {...structuredClone(asset), visible: val} )} 
                />
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>

            {active && <div className={styles.assetBody}>
                {renderPositionSliders({displayName: 'Position', propertyName:'position', propertyValue: asset.position, step: 0.005})}
                {renderRotationSliders({displayName: 'Rotation', propertyName:'rotation', propertyValue: asset.rotation, step: 0.01})}
                {renderScaleSliders({displayName: 'Scale', propertyName:'scale', propertyValue: asset.scale, step: 0.01})}

            </div>}
        </div>
    );
}