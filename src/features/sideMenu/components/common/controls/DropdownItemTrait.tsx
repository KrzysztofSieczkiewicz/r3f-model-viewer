import React, { useRef, useState } from "react";
import styles from './DropdownItemTrait.module.css';
import { useInterceptClickOutside } from "../../../hooks/useInterceptClickOutside";

type SelectableObject<T> = {
    object: T,
    displayName: string
}

type StringProps = {
    selected: string;
    selectionList: string[];
    handleSelect: (index: number) => void;
}

type ObjectProps<T> = {
    selected: SelectableObject<T>;
    selectionList: SelectableObject<T>[];
    handleSelect: (index: number) => void;
}

type Props<T> = StringProps | ObjectProps<T>;

export const DropdownItemTrait = <T,> ({selected, selectionList, handleSelect}: Props<T>) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);

    const Backdrop = useInterceptClickOutside(
        [listRef],
        isOpen,
        () => setIsOpen(false)
    );

    const getDisplayName = (item: SelectableObject<T> | string) => {
        return typeof item === "string"
            ? item
            : item.displayName
    }

    return (
        <div className={styles.container} >
            <button
                className={isOpen ? `${styles.body} ${styles.active}` : styles.body}
                type="button"
                onClick={(e) => {
                    setIsOpen(!isOpen)
                }}
            >
                <div className={styles.value}>{getDisplayName(selected)}</div>
                {isOpen
                ? <span className={styles.arrow}>&#8657;</span>
                : <span className={styles.arrow}>&#8659;</span>}
            </button>
            {isOpen && (
                <>
                    <Backdrop />
                    <div className={styles.optionsList} ref={listRef}>
                        {selectionList.map((item, index) => (
                            <button className={styles.option}
                                key={index}
                                onClick={() => {
                                    handleSelect(index);
                                    setIsOpen(false);
                                }}
                            >
                                {getDisplayName(item)}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}