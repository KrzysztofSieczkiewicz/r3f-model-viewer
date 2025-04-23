import React, { ReactNode } from "react";
import styles from './ModalDropdownSingle.module.css';

import { ModalSingleColumnList } from "./ModalSingleColumnList";
import { ButtonLargeRectangle } from "./ButtonLargeRectangle";

type Props = {
    displayName: string,
    isOpen: boolean,
    toggleOpen: () => void,

    icon: JSX.Element,
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
export const ModalDropdownSingle = ( {displayName, isOpen, toggleOpen, children, icon}: Props) => {
    return (
        <div className={styles.container} >
            <ButtonLargeRectangle
                isToggled={isOpen}
                toggle={toggleOpen}
                displayName={displayName}
                icon={icon}
            />
            {isOpen && <ModalSingleColumnList children={children} />}
        </div>
    );
}