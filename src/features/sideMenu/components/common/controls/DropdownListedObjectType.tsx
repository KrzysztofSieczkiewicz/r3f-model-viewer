import React from 'react';
import { useRef, useState } from 'react';
import styles from './DropdownListedObjectType.module.css';
import { useInterceptClickOutside } from '../../../hooks/useInterceptClickOutside';

type Props<T> = {
    current: string,
    availableOptions: T[],
    onChange: (option: T) => void;
}

export const DropdownListedObjectType = <T extends string | number>({current, availableOptions, onChange}: Props<T>): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useInterceptClickOutside(
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
                className={isOpen ? `${styles.dropdownButton} ${styles.active}` : styles.dropdownButton}
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleList()
                }}
            >
                <div className={styles.currentValue}>{current}</div>
                {isOpen
                ? <span className={styles.arrow}>&#8657;</span>
                : <span className={styles.arrow}>&#8659;</span>}
            </button>
            {isOpen && renderOptionsList(availableOptions)}
        </div>
    )
}