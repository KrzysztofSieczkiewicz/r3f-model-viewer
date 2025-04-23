import React, { ChangeEvent, useEffect, useState } from "react";
import styles from './CheckboxItemTrait.module.css';


type Props = {
    value: boolean,
    handleChange: (val: boolean) => void
}

export const CheckboxItemTrait = ( {value, handleChange}: Props) => {
    const [isChecked, setIsChecked]=useState(value);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange( e.target.checked )
    }

    // UPDATE THE VALUE IF PROVIDED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect( () => {
        setIsChecked(value);
    }, [value])


    return (
        <>
            <input
                className={isChecked ? `${styles.checkbox} ${styles.checked}` : styles.checkbox}
                type="checkbox" 
                checked={isChecked}
                onChange={(e) => handleInput(e)}
            />
            <span className="checkbox-checkmark" />
        </>
    );
}