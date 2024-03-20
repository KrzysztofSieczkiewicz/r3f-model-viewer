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

export const AssetItem = (props: Props) => {
    const { active, asset, onClick } = props;

    const { updateAssetProperty } = useSidebarControlsContext();

    const handleAssetName = () => {
        return asset.name.charAt(0).toUpperCase() + asset.name.slice(1);
    }

    const handleAssetActive = () => {
        return active ? "&#8657;" : "&#8659;"
    }


    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header asset-item-header"
                onClick={onClick}
            >
                <PointLightIcon className='type-icon header-icon' />
                <p className='header-title'>{ handleAssetName() }</p>
                <VisibilityEyeButton asset={asset} updateProperty={updateAssetProperty} />
                <span className='show-hide header-icon'>{handleAssetActive()}</span>
            </div>

            {active && <div className="dropdown-item-body">
                <SlidersArray name="Position"
                    value={asset.position} step={0.005}
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