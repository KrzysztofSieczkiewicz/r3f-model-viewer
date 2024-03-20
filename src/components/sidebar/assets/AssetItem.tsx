import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from '../../../models/Asset';
import { VisibilityEyeButton } from '../../hubComponents/VisibilityEyeButton';
import { useSidebarControlsContext } from '../SidebarControlsContext'
import { SlidersArray } from '../controls/SlidersArray';
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

    // TODO: Dlaczego nie działa?
    const RenderSlidersArray = ( {displayName, propertyName, propertyValue, step}: SlidersArrayProps): JSX.Element => {
        return (
            <SlidersArray name= {displayName}
                    value={propertyValue} step={step}
                    handleChange={(val: [number,number,number]) => updateAssetProperty(asset.id, propertyName, val)}
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
                <RenderSlidersArray 
                    displayName='Position' 
                    propertyName='position' 
                    propertyValue={asset.position} 
                    step={0.005}
                />
                <SlidersArray 
                    name="Position"
                    value={asset.position} 
                    step={0.005}
                    handleChange={(val: [number,number,number]) => updateAssetProperty(asset.id, 'position', val)}
                />
                <SlidersArray name="Scale"
                    value={asset.scale} step={0.01}
                    handleChange={(val: [number,number,number]) => updateAssetProperty(asset.id, 'scale', val)}
                />
                <SlidersArray name="Rotation"
                    value={asset.rotation} step={0.01}
                    handleChange={(val: [number,number,number]) => updateAssetProperty(asset.id, 'rotation', val)}
                />
            </div>}
        </div>
    );
}