import React, { useRef, useState } from "react";
import styles from './DropdownItemTrait.module.css';
import { useInterceptClickOutside } from "../../../hooks/useInterceptClickOutside";

type Props = {
    selected: string;
    selectionList: string[];
    handleSelect: (index: number) => void;
}

export const DropdownItemTrait = ({selected, selectionList, handleSelect}: Props) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);

    const Backdrop = useInterceptClickOutside(
        [listRef],
        isOpen,
        () => setIsOpen(false)
    );

    return (
        <div className={styles.container} >
            <button
                className={isOpen ? `${styles.body} ${styles.active}` : styles.body}
                type="button"
                onClick={(e) => {
                    setIsOpen(!isOpen)
                }}
            >
                <div className={styles.value}>{selected}</div>
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
                                {item}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}