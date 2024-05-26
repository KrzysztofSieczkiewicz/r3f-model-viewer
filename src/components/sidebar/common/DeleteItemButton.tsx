import React from "react";
import { ReactComponent as DeleteIcon } from './../../../icons/sidebar/thrash_bin.svg';
import styles from "./DeleteItemButton.module.css"

type Props = {
    deleteObject: () => void
}

export const DeleteItemButton = ({deleteObject} :Props): JSX.Element => {
    return (
        <span className={styles.container}>
            <button
                className={styles.button}
                onClick={() =>  deleteObject() } 
            >
                <DeleteIcon className={styles.icon}/>
            </button>
        </span>
    );
}