import React from "react";

import { AssetWrapper } from "../../../models/assets/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { DeleteItemButton } from "../common/DeleteItemButton";
import { ListItemBody } from "../commons/ListItemBody";
import { MeshControls } from "./meshControls/MeshControls";
import { MaterialControls } from "./materialControls/MaterialControls";
import { SlidersArray } from "../controls/SlidersArray";
import { TraitSingle } from "../../../features/sideMenu/components/common/traitContainers/TraitSingle";


type Props = {
    assetId: string,
    asset: AssetWrapper,
}

export const AssetControls = ({assetId, asset}: Props) => {
    const {updateAssetProperties, deleteAsset} = useSceneObjectsContext();

    const { scale, rotation, position } = asset.properties;

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteAsset(assetId)} />

            <MeshControls asset={asset} />
            <MaterialControls asset={asset} />

            <TraitSingle name="Position">
                <SlidersArray
                    value={position}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {position: val})} />
            </TraitSingle>

            <TraitSingle name="Rotation">
                <SlidersArray
                    value={rotation}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {rotation: val})} />
            </TraitSingle>

            <TraitSingle name="Scale">
                <SlidersArray
                    value={scale}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {scale: val})}
                    axesLocking />
            </TraitSingle>
        </ListItemBody>
    );

}