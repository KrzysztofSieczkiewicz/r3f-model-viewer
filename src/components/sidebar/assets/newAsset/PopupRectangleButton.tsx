import React from "react";
import styles from './PopupRectangleButton.module.css';

import { PopupMainButton } from "./PopupMainButton";

type Props = {
    displayName: string,
    isOpen: boolean,
    toggleOpen: () => void,

    optionsList: string[];
}

export const PopupRectangleButton = ( {displayName, isOpen, toggleOpen, optionsList}: Props) => {

    return (
        <div className={styles.container} >
            <PopupMainButton
                displayName={displayName}
                isOpen={isOpen}
                toggleOpen={() => toggleOpen()}
            />
            {isOpen && (
                <ul className={styles.optionsList}>
                    {optionsList.map((option) => {
                        return (
                            <li>Sphere</li>
                        );
                    } )}
                </ul>
            )}
        </div>
    );
}