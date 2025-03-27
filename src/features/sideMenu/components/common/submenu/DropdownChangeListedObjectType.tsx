import React from 'react';
import { useRef, useState } from 'react';
import styles from './Submenu.module.css';
import { useHandleOutsideClick } from '../../../hooks/useHandleClickOutside';

type Props<T> = {
    current: string,
    availableOptions: T[],
    onChange: (option: T) => void;
}

export const DropdownChangeListedObjectType = <T extends string | number>({current, availableOptions, onChange}: Props<T>): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useHandleOutsideClick(
        [dropdownRef],
        isOpen,
        () => setIsOpen(false)
    );

    const toggleList = () => {
        setIsOpen(!isOpen); 
    }

    const renderOptionsList = (options: T[]) => {
        return (
            <ul className={styles.optionsList}>
                {options.map((option) => renderListButton(option))}
            </ul>
        );
    }

    const renderListButton = (option: T) => {
        return (
            <li className={styles.listItem} key={option}>
                <button 
                    className={styles.option}
                    onClick={() => {
                        onChange(option);
                        setIsOpen(false); }}
                    >
                        {option}
                </button>
            </li>
        );
    };

    return (
        <div className={styles.container}
            ref={dropdownRef}>
            <button
                className={isOpen ? `${styles.body} ${styles.active}` : styles.body}
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleList()
                }}
            >
                <div className={styles.value}>{current}</div>
                {isOpen
                ? <span className={styles.arrow}>&#8657;</span>
                : <span className={styles.arrow}>&#8659;</span>}
            </button>
            {isOpen && renderOptionsList(availableOptions)}
        </div>
    )
}