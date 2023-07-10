import { useState } from "react";

export function Trait(props) {
    const { value, min, max, step } = props;

    const [ protectedValue, setProtectedValue ] = useState(value);

    function handleProtectedValue(e) {
        const inputValue = e.target.value;

        if (!isNaN(inputValue)) {
            setProtectedValue(0);
        }
        if (inputValue > max) {
            setProtectedValue(max);
            console.log("Too high");
        } else if (inputValue < min) {
            setProtectedValue(min);
            console.log("Too low");
        } else {
            setProtectedValue(inputValue);
            console.log("All good");
        }
        
        props.handleChange(e);
    }

    //handle props types
    function handleTraitType() {
        if(props.type === 'number-input') {
            return (
                <input className="trait-input"
                    type="number"
                    value={protectedValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={e => handleProtectedValue(e)}
                    inputMode="numeric"
                    pattern="[0-9]+"
                />
            );
        }
    }

    return (
        <div className='trait'>
            <label className='trait-name'>{props.name}</label>

            {inputSlider()}
        </div>
    );

        // TODO CREATE FIELD WITH CUSTOM SLIDER CHANGE
        function inputSlider() {
            return (
                <div className="input-test">
                    <i className="arrow left">&#60;</i>
                    {protectedValue}
                    <i className="arrow right">&#62;</i>
                </div>
            );
        }
    
}