import React from 'react';

import { ListedObject } from '../common/submenus/ListedObject';
import { ListedObjectBody } from '../common/submenus/ListedObjectBody';
import { AssetWrapper } from '../../../../models/assets/Asset';
import { ListedAssetHeader } from './ListedAssetHeader';
import { ButtonDeleteObject } from '../common/controls/ButtonDeleteObject';
import { useSceneObjectsContext } from '../../../common/contexts/SceneObjectsContext';
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
        <ListedObject>
            <ListedAssetHeader 
                isActive={isActive} 
                asset={asset}
                toggleExtend={() => toggleExtend()} />

            <ListedObjectBody isVisible={isActive}>
                <ButtonDeleteObject handleDelete={() => deleteAsset(asset.id)} />
                <AssetControls asset={asset}/>
                <MeshControls asset={asset} />
                <MaterialControls asset={asset} />
            </ListedObjectBody>
            
        </ListedObject>
    );
}