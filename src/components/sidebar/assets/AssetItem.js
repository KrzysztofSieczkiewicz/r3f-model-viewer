import { useContext } from 'react';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import SidebarControlsContext from '../../sidebar/SidebarControlsContext'

export function AssetItem(props) {
    const { active, asset } = props;
    const { updateAsset } = useContext(SidebarControlsContext);

    const handleAssetActive = () => {
        if(active) {
            return <icon className='show-hide header-icon'>&#8657;</icon>
        } else {
            return <icon className='show-hide header-icon'>&#8659;</icon>
        }
    }

    const handleAssetVisible = () => {
        return (<icon className={`visibility-icon header-icon ${!asset.visible ? "suppressed" : ""}`} 
            onClick={(e) => {
                e.stopPropagation();
                updateAsset(asset.id, 'visible', !asset.visible)
            }}
            >&#128065;</icon>
        );
    }

    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header asset-item-header"
                onClick={props.onClick}
            >
                <PointLightIcon className='type-icon header-icon' />
                <p className='header-title'>{asset.nameId}</p>
                {handleAssetVisible()}
                {handleAssetActive()}
            </div>

            {active && <div className="dropdown-item-body">
                <div className='trait'>
                    <label className='trait-name'>Name:</label>
                    <div className='trait-input'>{asset.nameId}</div>
                </div>
                <div className='trait'>
                    <label className='trait-name'>Position:</label>
                    <div className='trait-input'>{asset.position}</div>
                </div>
                <div className='trait'>
                    <label className='trait-name'>Scale:</label>
                    <div className='trait-input'> <p>{asset.scale}</p> </div>
                </div>
                <div className='trait'>
                    <label className='trait-name'>Rotation:</label>
                    <div className='trait-input'> <p>{asset.rotation}</p> </div>
                </div>
                
            </div>}

        </div>
    );
}