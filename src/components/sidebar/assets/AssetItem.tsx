import React, { useContext } from "react"
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from "../../../interfaces/asset.model";
import { SidebarControlsContext } from "../SidebarControlsContext";
import { SlidersArray } from "../controls/SlidersArray";

interface AssetItem {
    active: boolean,
    asset: AssetWrapper,
    onClick: () => void
}

const AssetItem = ({ active, asset, onClick }: AssetItem) => {
    // TODO: MOVE THESE FUNCTIONS TO SEPARATE FUNCTION HANDLER?
    const { updateAsset } = useContext(SidebarControlsContext);

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
                updateAsset( { ...asset, visible: !asset.visible } );
            }}
            >&#128065;</span>
        );
    }

    return(
    <div>
        <div className="dropdown-item-header asset-item-header"
                onClick={onClick}
        >
            <PointLightIcon className='type-icon header-icon' />
            {handleAssetName()}
            {handleAssetVisible()}
            {handleAssetActive()}
        </div>

        {active && <div className="dropdown-item-body">
            <SlidersArray name="Position"
                value={asset.position ? asset.position.toArray().map(Number) : []} step={0.005}
                handleChange={(val) => updateAsset( { ...asset, position: val } )}
            />
            <SlidersArray name="Scale"
                value={asset.scale ? asset.scale.toArray().map(Number) : []} step={0.01}
                handleChange={(val) => updateAsset( { ...asset, scale: val } )}
            />
            <SlidersArray name="Rotation"
                value={asset.rotation ? asset.rotation.toArray().map(Number) : []} step={0.01}
                handleChange={(val) => updateAsset( { ...asset, rotation: val } )}
            />
        </div>}
    </div>
    );
}
