import React, { useRef, useState } from "react";
import styles from './DropdownItemTrait.module.css';
import { useDetectClickOutside } from "../../../hooks/useInterceptClickOutside";

type Props<T> = {
    selected: T,
    selectionList: T[],
    handleChange: (value: T) => void
}

export const DropdownItemTrait = <T,> ({selected, selectionList, handleChange}: Props<T>) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useDetectClickOutside(
        [dropdownRef],
        isOpen,
        () => setIsOpen(false)
    );

    const handleSelect = (option: T) => {
        handleChange(option);
        setIsOpen(false);
    }

    const toggleList = () => {
        setIsOpen(!isOpen); 
    }

    return (
        <div className={styles.container}
            ref={dropdownRef}>
            <button
                className={isOpen ? `${styles.body} ${styles.active}` : styles.body}
                type="button"
                onClick={(e) => {
                    toggleList()
                }}
            >
                <div className={styles.value}>{String(selected)}</div>
                {isOpen
                ? <span className={styles.arrow}>&#8657;</span>
                : <span className={styles.arrow}>&#8659;</span>}
            </button>
            {isOpen && (
                <div className={styles.optionsList}>
                    {selectionList.map((item) => (
                        <button className={styles.option}
                            key={String(item)}
                            onClick={(e) => {
                                handleSelect(item);
                            }}
                        >
                            {String(item)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}