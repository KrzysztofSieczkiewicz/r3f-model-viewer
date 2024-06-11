import React from 'react';
import styles from './Assets.module.css'

import { AssetWrapper } from '../../../models/Asset';
import { AssetControls } from './AssetControls';
import { AssetItemHeader } from './AssetItemHeader';

type Props = {
    isActive: boolean,
    asset: AssetWrapper,
    toggleExtend: () => void,
}

export const AssetItem = ( {isActive, asset, toggleExtend}: Props) => {

    return (
        <div className={isActive ? `${styles.assetContainer} ${styles.active}` : styles.assetContainer}>
            <AssetItemHeader isActive={isActive} asset={asset} toggleExtend={() => toggleExtend()} />
            {isActive && <AssetControls asset={asset} />}
        </div>
    );
}