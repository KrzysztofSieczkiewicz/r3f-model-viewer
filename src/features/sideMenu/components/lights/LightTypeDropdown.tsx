import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './LightTypeDropdown.module.css';
import { LIGHT_TYPES } from '../../../../models/Light';

type Props = {
    current: string,
    selectionList: SelectionList[],
    handleChange: (item: LIGHT_TYPES) => void
}

type SelectionList = {
    type: LIGHT_TYPES,
    display: string
}

export const LightTypeDropdown = (props: Props): JSX.Element => {
    const { current, selectionList, handleChange } = props;

    const [ isOpen, setIsOpen ] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const getDisplayNameByType = (type: string) => {
        return selectionList.find((light) =>  light.type === type)?.display
    }

    const selectOption = (option: LIGHT_TYPES) => {
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
                <div className={styles.value}>{getDisplayNameByType(current)}</div>
                {isOpen
                ? <span className={styles.arrow}>&#8657;</span>
                : <span className={styles.arrow}>&#8659;</span>}
            </button>
            {isOpen && (
                <div className={styles.optionsList}>
                    {selectionList.map((item) => (
                        <button className={styles.option}
                            key={item.type}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectOption(item.type);
                            }}
                        >
                            {item.display}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}