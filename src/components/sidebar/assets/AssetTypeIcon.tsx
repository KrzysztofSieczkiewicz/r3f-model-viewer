import React from "react";
import styles from '../commons/MenuListItemHeader.module.css';

import { ReactComponent as AssetIcon } from '../../../icons/sidebar/cube.svg';

// TODO: MOVE THIS TO BE UNIVERSALLY ABSTRACT - ALSO GET BETTER NAME TO INDICATE WHERE IT SHOULD BE USED
export const AssetTypeIcon = () => {
    return(
        <AssetIcon className={styles.typeIcon} />
    );
}