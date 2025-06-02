import React from "react";

import { TraitExpandable } from "../common/traits/TraitExpandable";
import { AssetWrapper } from "../../../../models/assets/Asset";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";
import { TraitSingle } from "../common/traits/TraitSingle";
import { SlidersArray } from "../common/controls/SlidersArray";
import { useSidebarModal } from "../../../../hooks/useSidebarModal";
import { ImportMeshModal } from "../../../modals/assets/ImportMeshModal";
import { UnwrappedWrapper } from "../../../../models/assets/meshes/Unwrapped";


type Props = {
    asset: AssetWrapper,
}

export const AssetControls = ({asset}: Props) => {
    const {updateAssetProperties} = useSceneObjectsContext();

    const { scale, rotation, position } = asset.properties;
    const assetId = asset.id;

    const mesh = asset.mesh as UnwrappedWrapper

    const { openModal, closeModal, SidebarModal } = useSidebarModal();

    return (
        <TraitExpandable name="General" expanded={true}>
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

            <button onClick={openModal}> TEST LISTING MESH </button>
            <SidebarModal>
                <ImportMeshModal src={mesh.src} closeModal={closeModal}/>
            </SidebarModal>
        </TraitExpandable>
    );

}