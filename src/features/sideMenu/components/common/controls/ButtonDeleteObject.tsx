import React from "react";
import { ReactComponent as DeleteIcon } from './../../../../../icons/sidebar/thrash_bin.svg';
import styles from "./ButtonDeleteObject.module.css"

type Props = {
    handleDelete: () => void
}

export const ButtonDeleteObject = ({handleDelete} :Props): JSX.Element => {
    return (
        <span className={styles.container}>
            <button
                className={styles.button}
                onClick={() =>  handleDelete() } 
            >
                <DeleteIcon className={styles.icon}/>
            </button>
        </span>
    );
}