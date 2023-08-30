import { useContext } from 'react';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import SidebarControlsContext from '../../sidebar/SidebarControlsContext'
import { PositionSliders } from '../controls/PositionSliders';

export function AssetItem(props) {
    const { active, asset } = props;
    const { updateAsset } = useContext(SidebarControlsContext);

    const handleAssetName = () => {
        const assetName = asset.name;
        const name = assetName.charAt(0).toUpperCase() + assetName.slice(1);
        console.log("handleAssetName was triggered")
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
                updateAsset(asset.id, 'visible', !asset.visible)
            }}
            >&#128065;</span>
        );
    }

    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header asset-item-header"
                onClick={props.onClick}
            >
                <PointLightIcon className='type-icon header-icon' />
                {handleAssetName()}
                {handleAssetVisible()}
                {handleAssetActive()}
            </div>

            {active && <div className="dropdown-item-body">
                <PositionSliders name="Position"
                    value={asset.position} step={0.01}
                    handleChange={(val) => updateAsset(asset.id, 'position', val)}
                />
                <PositionSliders name="Scale"
                    value={asset.scale} step={0.001}
                    handleChange={(val) => updateAsset(asset.scale, 'scale', val)}
                />
                <PositionSliders name="Rotation"
                    value={asset.rotation} step={0.001}
                    handleChange={(val) => updateAsset(asset.rotation, 'rotation', val)}
                />
            </div>}
        </div>
    );
}