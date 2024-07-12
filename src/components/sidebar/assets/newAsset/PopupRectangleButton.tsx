import React, { FunctionComponent, ReactNode, SVGProps } from "react";
import styles from './PopupRectangleButton.module.css';

import { PopupMainButton } from "./PopupMainButton";

type Props = {
    displayName: string,
    isOpen: boolean,
    toggleOpen: () => void,

    children: ReactNode;
}

export const PopupRectangleButton = ( {displayName, isOpen, toggleOpen, children}: Props) => {

    return (
        <div className={styles.container} >
            <PopupMainButton
                displayName={displayName}
                isOpen={isOpen}
                toggleOpen={() => toggleOpen()}
            />
            {isOpen && (
                <ul className={styles.optionsList}>
                    {React.Children.map(children, child => (
                        child
                    ))}
                </ul>
            )}
        </div>
    );
}