import React from "react";
import styles from '../commons/MenuListItemHeader.module.css';

import { ReactComponent as AssetIcon } from '../../../icons/sidebar/cube.svg';

// TODO: ADD PROPER ICONS FOR ASSETS
export const AssetTpeIcon = () => {
    return(
        <AssetIcon className={styles.typeIcon} />
    );
}