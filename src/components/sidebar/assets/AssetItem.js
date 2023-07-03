import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { ReactComponent as Visible } from '../../../icons/eye-on.svg';

export function AssetItem(props) {
    const { active, asset, updateAsset } = props;

    const handleAssetActive = () => {
        // TODO: replace S/H with appropriate arrows (avoid icons for this one), consider adding className
        if(active) {
            return <p className='show-hide'>H</p>
        } else {
            return <p className='show-hide'>S</p>
        }
    }

    return (
        <div className="dropdown-item">
            <div className="dropdown-item-header"
                onClick={props.onClick}
            >
                <PointLightIcon className='light-icon' />
                <p>{asset.nameId}: {asset.variant}</p>
                <div className="color-preview" style={{backgroundColor: "#FFF"}}/>
                <Visible className='light-icon' />
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