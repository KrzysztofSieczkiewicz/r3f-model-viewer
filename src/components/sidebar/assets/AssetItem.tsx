import { useContext } from 'react';
// TODO: JAK DODAĆ IKONĘ
//import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import SidebarControlsContext from '../SidebarControlsContext'
import { SlidersArray } from '../controls/SlidersArray';
import React from 'react';

type Props = {
    active: boolean,
    asset: {
        id: string,
        object: string,
        name: string,
        position: number[],
        rotation: number[],
        scale: number[],
        ref: HTMLDivElement | null,
        castShadow: boolean,
        receiveShadow: boolean,
        visible: boolean,
        isSelected: boolean,
    },
    onClick: () => void
}

export const AssetItem = (props: Props) => {
    const { active, asset, onClick } = props;

    const { updateAssetProperty } = useContext(SidebarControlsContext);

    const handleAssetName = () => {
        const name = asset.name.charAt(0).toUpperCase() + asset.name.slice(1);
        return (
            <p className='header-title'>{name}</p>
        );
    }

    const handleAssetActive = () => {
        if(active) {
            return <span className='show-hide header-icon'>&#8657;</span>
        } else {
            return <span className='show-hide header-icon'>&#8659;</span>
        }
    }

    const handleAssetVisible = () => {
        return (<span className={`visibility-icon header-icon ${!asset.visible ? "suppressed" : ""}`} 
            onClick={(e) => {
                e.stopPropagation();
                updateAssetProperty(asset.id, 'visible', !asset.visible)
            }}
            >&#128065;</span>
        );
    }

    // TODO: FIND NEW ICONS FOR ASSETS
    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header asset-item-header"
                onClick={onClick}
            >
                <div className='type-icon header-icon' />
                {/* <PointLightIcon className='type-icon header-icon' /> */}
                {handleAssetName()}
                {handleAssetVisible()}
                {handleAssetActive()}
            </div>

            {active && <div className="dropdown-item-body">
                <SlidersArray name="Position"
                    value={asset.position} step={0.005}
                    handleChange={(val: number[]) => updateAssetProperty(asset.id, 'position', val)}
                />
                <SlidersArray name="Scale"
                    value={asset.scale} step={0.01}
                    handleChange={(val: number[]) => updateAssetProperty(asset.id, 'scale', val)}
                />
                <SlidersArray name="Rotation"
                    value={asset.rotation} step={0.01}
                    handleChange={(val: number[]) => updateAssetProperty(asset.id, 'rotation', val)}
                />
            </div>}
        </div>
    );
}