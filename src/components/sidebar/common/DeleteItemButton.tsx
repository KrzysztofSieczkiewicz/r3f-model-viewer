import React from "react";
import { ReactComponent as DeleteIcon } from './../../../icons/sidebar/thrash_bin.svg';
import styles from "./DeleteItemButton.module.css"

type Props = {
    deleteObject: () => void
}

export const DeleteItemButton = ({deleteObject} :Props): JSX.Element => {
    return (
        <button
            className={styles.button}
            onClick={(e) => {
                e.stopPropagation();
                deleteObject();
            }}
        ><DeleteIcon className={styles.icon}/></button>
    );
}