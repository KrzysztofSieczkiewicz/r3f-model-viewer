import React, { useRef, useState } from "react";
import styles from './Submenu.module.css';
import { useHandleOutsideClick } from "../../../hooks/useHandleClickOutside";

type Props<T> = {
    availableOptions: T[],
    allOptions?: T[],
    onChange: (option: T) => void;
}

export const DropdownAddListedObject = <T extends string | number>({ availableOptions, allOptions, onChange }: Props<T>) => {
    const [ isActive, setIsActive ] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    useHandleOutsideClick(
        [buttonRef, listRef],
        isActive,
        () => setIsActive(false)
    );

    const renderOptionsList = (available: T[], all?: T[]) => {
        if (all === undefined) {
            return available.map((option) => renderListButton(option, true));
        } else {
            return all.map((option) => {
                const isAvailable = available.includes(option);
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
                        onChange(option);
                        setIsActive(false); }}
                    >
                        {option}
                </button>
            </li>
        );
    };

    return (
        <div className={styles.addItemDropdownContainer}>
            <button 
                ref={buttonRef} 
                className={styles.addItemDropdownButton} 
                onClick={() => setIsActive(!isActive)}> ADD NEW </button>
            
            {isActive &&
            <ul ref={listRef} className={styles.addItemDropdownList}>
                { renderOptionsList(availableOptions, allOptions) }
            </ul>}
        </div>
    );
}