import React from 'react';

import { SubmenuListedObject } from '../common/submenu/SubmenuListedObject';
import { SubmenuListedObjectBody } from '../common/submenu/SubmenuListedObjectBody';
import { AssetWrapper } from '../../../../models/assets/Asset';
import { ListedAssetObjectHeader } from './ListedAssetObjectHeader';
import { DeleteItemButton } from '../../../../components/sidebar/common/DeleteItemButton';
import { useSceneObjectsContext } from '../../../../components/contexts/SceneObjectsContext';
import { AssetControls } from './AssetControls';
import { MeshControls } from './MeshControls';
import { MaterialControls } from './MaterialControls';

type Props = {
    isActive: boolean,
    asset: AssetWrapper,
    toggleExtend: () => void,
}

export const ListedAssetObject = ( {isActive, asset, toggleExtend}: Props) => {
    const {deleteAsset} = useSceneObjectsContext();

    return (
        <SubmenuListedObject isActive={isActive}>
            <ListedAssetObjectHeader isActive={isActive} assetId={asset.id} assetProperties={asset.properties} toggleExtend={() => toggleExtend()} />
            {isActive && 
            <SubmenuListedObjectBody>
                <DeleteItemButton deleteObject={() => deleteAsset(asset.id)} />
                <AssetControls asset={asset}/>
                <MeshControls asset={asset} />
                <MaterialControls asset={asset} />
            </SubmenuListedObjectBody>
            }
        </SubmenuListedObject>
    );
}