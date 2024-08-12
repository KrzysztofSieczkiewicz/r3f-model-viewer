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

    return (
        <MenuListItem isActive={isActive}>
            <AssetItemHeader isActive={isActive} assetId={asset.id} assetProperties={asset.properties} toggleExtend={() => toggleExtend()} />
            {isActive && <AssetControls assetId={asset.id} asset={asset} />}
        </MenuListItem>
    );
}