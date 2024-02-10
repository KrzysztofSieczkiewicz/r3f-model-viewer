import { useContext } from "react"
//import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { AssetWrapper } from "../../../interfaces/asset.model";
import { SidebarControlsContext } from "../SidebarControlsContext";
import { SlidersArray } from "../controls/SlidersArray";
import { AssetsService } from "../../../services/assets.service";
import { Vector3 } from "three/src/math/Vector3";
import { Euler } from "three/src/math/Euler";
import { StyledDropdownSectionBody, StyledDropdownSectionHeader, StyledShowHideButton, StyledToggleVisibleButton } from "../Sidebar.styles";

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
            <StyledDropdownSectionHeader>{name}</StyledDropdownSectionHeader>
        );
    }
    
    const handleAssetActive = () => {
        if(active) {
            return <StyledShowHideButton>&#8657;</StyledShowHideButton>
        } else {
            return <StyledShowHideButton>&#8659;</StyledShowHideButton>
        }
    }
    
    const handleAssetVisible = () => {
        return (
            <StyledToggleVisibleButton 
                className={!asset.visible ? "suppressed" : ""}
                onClick={(e) => {
                    e.stopPropagation();
                    setAssetsList( AssetsService.updateAsset( assetsList, asset.id, { ...asset, visible: !asset.visible } ));
                }}
            >
                &#128065;
            </StyledToggleVisibleButton>
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

        {active && <StyledDropdownSectionBody>
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
        </StyledDropdownSectionBody>}
    </div>
    );
}

export default AssetItem;