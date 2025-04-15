import React, { useRef, useState } from "react";
import styles from './DropdownAddListedObject.module.css';
import { useDetectClickOutside } from "../../../hooks/useInterceptClickOutside";

type Props<T> = {
    availableOptions: T[],
    allOptions?: T[],
    onChange: (option: T) => void;
}

export const DropdownAddListedObject = <T extends string | number>({ availableOptions, allOptions, onChange }: Props<T>) => {
    const [ isActive, setIsActive ] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    useDetectClickOutside(
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
            <li className={styles.listItem} key={option}>
                <button 
                    className={isAvailable ? `${styles.listItemButton}` : `${styles.listItemButton} ${styles.disabled}`}
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
        <div className={styles.container}>
            <button 
                ref={buttonRef} 
                className={styles.button} 
                onClick={() => setIsActive(!isActive)}> ADD NEW </button>
            
            {isActive &&
            <ul ref={listRef} className={styles.optionsList}>
                { renderOptionsList(availableOptions, allOptions) }
            </ul>}
        </div>
    );
}