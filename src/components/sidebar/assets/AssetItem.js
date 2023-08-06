import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';

export function AssetItem(props) {
    const { active, asset, updateAsset } = props;

    const handleAssetActive = () => {
        if(active) {
            return <icon className='show-hide'>&#8657;</icon>
        } else {
            return <icon className='show-hide'>&#8659;</icon>
        }
    }

    return (
        <div className="dropdown-item">
            <div className="dropdown-item-header"
                onClick={props.onClick}
            >
                <PointLightIcon className='type-icon header-icon' />
                <p>{asset.nameId}: {asset.variant}</p>
                <div className="color-preview" style={{backgroundColor: "#FFF"}}/>
                <icon className="icon visibility-icon">&#x1F441;</icon>
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