import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {
    name: string,
    value: boolean,
    handleChange: (val: boolean) => void
}

export const Checkbox = ( {name, value, handleChange}: Props) => {
    const [isChecked, setIsChecked]=useState(value);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange( e.target.checked )
    }

    // UPDATE THE VALUE IF PROVIDED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect( () => {
        setIsChecked(value);
    }, [value])


    return (
        <div className="trait">
            <label className="trait-name">{name}</label>
            <div className="checkbox-container">
                <input
                    className="checkbox-input"
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => handleInput(e)}
                />
                <span className="checkbox-checkmark" />
            </div>
        </div>
    );
}