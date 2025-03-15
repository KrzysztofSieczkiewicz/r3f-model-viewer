import React from 'react';

import { AssetWrapper } from '../../../models/assets/Asset';
import { AssetControls } from './AssetControls';
import { AssetItemHeader } from './AssetItemHeader';
import { MenuListItem } from '../commons/MenuListItem';

type Props = {
    isActive: boolean,
    asset: AssetWrapper,
    toggleExtend: () => void,
}

export const AssetItem = ( {isActive, asset, toggleExtend}: Props) => {

    // TODO [CURRENT]: REWORK THIS (AND OTHER TYPES) to use 
    // SubmenuListedItem
    // SubmenuListedItemHeader
    // SubmenuListedItemBody
    // Then - thic class should be merged with AssetControls and named SubmenuListedAsset
    // Ideally AssetControls would be a similar component compared to MeshControls and MaterialControls. Just containing some controls (and opened by default)
    // That would simplify this component so it wouldn't contain traits containers etc. directly
    return (
        <MenuListItem isActive={isActive}>
            <AssetItemHeader isActive={isActive} assetId={asset.id} assetProperties={asset.properties} toggleExtend={() => toggleExtend()} />
            {isActive && <AssetControls assetId={asset.id} asset={asset} />}
        </MenuListItem>
    );
}