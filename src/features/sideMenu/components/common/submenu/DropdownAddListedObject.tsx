import React, { useEffect, useRef, useState } from "react";
import styles from './Submenu.module.css';
import { useHandleOutsideClick } from "../../../hooks/useHandleClickOutside";

type Props<T> = {
    availableOptions: T[],
    allOptions?: T[],
    onClick: (option: T) => void;
}

export const DropdownAddListedObject = <T extends string | number>({ availableOptions, allOptions, onClick }: Props<T>) => {
    const [ isActive, setIsActive ] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    useHandleOutsideClick(
        [buttonRef, listRef],
        isActive,
        () => setIsActive(false)
    );

    const renderDisplayOptionsList = () => {
        if (allOptions == undefined) {
            return availableOptions.map((option) => renderListButton(option, true));
        } else {
            return allOptions.map((option) => {
                const isAvailable = availableOptions.includes(option);
                return renderListButton(option, isAvailable);
            });
        }
    }

    const renderListButton = (option: T, isAvailable: boolean) => {
        return (
            <li className={styles.addItemDropdownListItem} key={option}>
                <button 
                    className={`${isAvailable ? styles.addItemDropdownListItemButton : styles.addItemDropdownListItemButtonDisabled}`}
                    onClick={() => {
                        if(!isAvailable) return;
                        onClick(option);
                        setIsActive(false); }}
                    >
                        {option}
                </button>
            </li>
        );
    };

    return (
        <div className={styles.addItemDropdownContainer}>
            <button ref={buttonRef} className={styles.addItemDropdownButton} onClick={() => setIsActive(!isActive)}> ADD NEW </button>
            
            {isActive &&
            <ul ref={listRef} className={styles.addItemDropdownList}>
                { renderDisplayOptionsList() }
            </ul>}
        </div>
    );
}