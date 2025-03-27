import React from 'react';

import { ListedObject } from '../common/submenu/ListedObject';
import { ListedObjectBody } from '../common/submenu/ListedObjectBody';
import { AssetWrapper } from '../../../../models/assets/Asset';
import { ListedAssetHeader } from './ListedAssetHeader';
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

export const ListedAsset = ( {isActive, asset, toggleExtend}: Props) => {
    const {deleteAsset} = useSceneObjectsContext();

    return (
        <ListedObject isActive={isActive}>
            <ListedAssetHeader isActive={isActive} assetId={asset.id} assetProperties={asset.properties} toggleExtend={() => toggleExtend()} />
            {isActive && 
            <ListedObjectBody>
                <DeleteItemButton deleteObject={() => deleteAsset(asset.id)} />
                <AssetControls asset={asset}/>
                <MeshControls asset={asset} />
                <MaterialControls asset={asset} />
            </ListedObjectBody>}
        </ListedObject>
    );
}