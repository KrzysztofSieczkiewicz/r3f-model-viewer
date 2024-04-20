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
        <div className="trait">{name}
            <label className="trait-name">
                <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => handleInput(e)}
                />
                <span className="checkmark" />
            </label>
        </div>
    );
}