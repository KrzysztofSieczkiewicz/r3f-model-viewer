import { useContext } from "react"
//import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from "../../../interfaces/asset.model";
import { SidebarControlsContext } from "../SidebarControlsContext";
import { SlidersArray } from "../controls/SlidersArray";
import { AssetsService } from "../../../services/assets.service";
import { Vector3 } from "three/src/math/Vector3";
import { Euler } from "three/src/math/Euler";
import styles from "./../Sidebar.module.css";

interface AssetItem {
    active: boolean,
    asset: AssetWrapper,
    onClick: (id :string) => void
}

// TODO: REINSTATE PointLightIcon

const AssetItem = ({ active, asset, onClick }: AssetItem) => {
    const { assetsList, setAssetsList } = useContext(SidebarControlsContext);

    const handleAssetName = () => {
        const name = asset.name.charAt(0).toUpperCase() + asset.name.slice(1);
        return (
            <p className={styles.headerTitle}>{name}</p>
        );
    }
    
    const handleAssetActive = () => {
        if(active) {
            return <span className='showHide headerIcon'>&#8657;</span>
        } else {
            return <span className='showHide headerIcon'>&#8659;</span>
        }
    }
    
    const handleAssetVisible = () => {
        return (<span className={`visibility-icon header-icon ${!asset.visible ? "suppressed" : ""}`} 
            onClick={(e) => {
                e.stopPropagation();
                setAssetsList(
                    AssetsService.updateAsset( assetsList, asset.id, { ...asset, visible: !asset.visible } )
                );
                
            }}
            >&#128065;</span>
        );
    }

    return(
    <div>
        <div className="dropdown-item-header asset-item-header"
                /*onClick={onClick}*/ // TODO: REINSTATE THIS IF NECESSARY
        >
            {/*<PointLightIcon className='type-icon header-icon' /> */}
            {handleAssetName()}
            {handleAssetVisible()}
            {handleAssetActive()}
        </div>

        {active && <div className="dropdown-item-body">
            <SlidersArray name="Position"
                value={asset.position ? asset.position.toArray().map(Number) : []} step={0.005}
                handleChange={(val) => setAssetsList( AssetsService.updateAsset(assetsList, asset.id, { ...asset, position: new Vector3(...val) }) ) }
            />
            <SlidersArray name="Scale"
                value={asset.scale ? asset.scale.toArray().map(Number) : []} step={0.01}
                handleChange={(val) => setAssetsList( AssetsService.updateAsset( assetsList, asset.id, { ...asset, scale: new Vector3(...val) }) ) }
            />
            <SlidersArray name="Rotation"
                value={asset.rotation ? asset.rotation.toArray().map(Number) : []} step={0.01}
                handleChange={(val) => setAssetsList( AssetsService.updateAsset( assetsList, asset.id, { ...asset, rotation: new Euler(...val) }) ) }
            />
        </div>}
    </div>
    );
}

export default AssetItem;