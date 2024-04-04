import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from '../../../models/Asset';
import { VisibilityEyeButton } from '../commonComponents/VisibilityEyeButton';
import { useSidebarControlsContext } from '../SidebarControlsContext'
import { SlidersArray } from '../commonComponents/SlidersArray';
import React from 'react';

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

export const AssetItem = ( {active, asset, onClick}: Props) => {

    const { updateAssetProperty } = useSidebarControlsContext();

    const handleAssetName = () => {
        return asset.name.charAt(0).toUpperCase() + asset.name.slice(1);
    }

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    const renderSlidersArray = ( props: SlidersArrayProps): JSX.Element => {
        //const {displayName, propertyName, propertyValue, step} = props;
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
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header asset-item-header"
                onClick={onClick}
            >
                <PointLightIcon className='type-icon header-icon' />
                <p className='header-title'>{ handleAssetName() }</p>
                <VisibilityEyeButton object={asset} updateProperty={updateAssetProperty} />
                <span className='show-hide header-icon'>{ handleIsActive() }</span>
            </div>

            {active && <div className="dropdown-item-body">
                {renderSlidersArray({displayName: 'Position', propertyName:'position', propertyValue: asset.position, step: 0.005})}
                {renderSlidersArray({displayName: 'Rotation', propertyName:'rotation', propertyValue: asset.rotation, step: 0.01})}
                {renderSlidersArray({displayName: 'Scale', propertyName:'scale', propertyValue: asset.scale, step: 0.01})}

            </div>}
        </div>
    );
}