import React, { useEffect, useRef, useState } from "react";
import styles from './SingleChoiceDropdown.module.css';

// TODO: simplify this??? make this work on pure stirng values and string arrays 
// handle proper selection and changes in the parent component then.
type Props = {
    selected: string,
    selectionList: string[],
    handleChange: (value: string) => void
}

export const SindleChoiceDropdown = ({selected, selectionList, handleChange}: Props) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const selectOption = (option: string) => {
        handleChange(option);
        setIsOpen(false);
    }

    const toggleList = () => {
        setIsOpen(!isOpen); 
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen]);

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
                <div className={styles.value}>{selected}</div>
                {isOpen
                ? <span className={styles.arrow}>&#8657;</span>
                : <span className={styles.arrow}>&#8659;</span>}
            </button>
            {isOpen && (
                <div className={styles.optionsList}>
                    {selectionList.map((item) => (
                        <button className={styles.option}
                            key={item}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectOption(item);
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}