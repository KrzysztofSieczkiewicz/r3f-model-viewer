import React, { ReactNode } from "react";
import styles from './PopupButtonLarge.module.css';

import { ReactComponent as CubeIcon } from './../../../icons/sidebar/cube.svg';
import { ModalSingleColumnList } from "./ModalSingleColumnList";

type Props = {
    displayName: string,
    isOpen: boolean,
    toggleOpen: () => void,
    
    children: ReactNode
}

// TODO: DISSOLVE THIS INTO THREE LEVELS:
/*
    1. Main button, accepting a List with children included
    2. The main list which also handles displaying children if button is toggled
    3. List items

    Currently it is divided as:
    1. Main button -> PopupButtonLarge with hardcoded list type; which accepts a number of children being list buttons
    2. List -> ModalSingleColumnList -> currently only hardcoded into PopupButtonLarge
    3. List button -> ModalListButton

    Replace this with:
    1. Main button -> button which accepts it's own icon as an prop, also accepts a whole list with all the children.
        When the button is toggled on, it displays the whole list component, if not... then it doesn't
    2. List -> a list which accepts contents and wraps it in the li -> currently mostly working as described,
        but it doesn't need isOpen logic as it should be taken care of by Main button component
    3. List button which just accepts function that should be triggered onClick. Currently closeModal() should not be hardcoded into button itself
*/
export const PopupButtonLarge = ( {displayName, isOpen, toggleOpen, children}: Props) => {
    return (
        <div className={styles.container} >
            <button
                className={isOpen 
                        ? `${styles.button} ${styles.active}` 
                        : styles.button}
                onClick={() => toggleOpen() }
            >
                <label className={styles.name}>{displayName}</label>
                <div className={styles.iconContainer}>
                    <CubeIcon className={styles.mainIcon} />
                    {isOpen
                        ? <span className={styles.arrow}>&#8657;</span>
                        : <span className={styles.arrow}>&#8659;</span>}
                </div>
            </button>
            {isOpen && <ModalSingleColumnList isOpen={isOpen} children={children} />}
        </div>
    );
}