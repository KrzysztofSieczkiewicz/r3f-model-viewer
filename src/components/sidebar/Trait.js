import { useState } from "react";

export function Trait(props) {
    const { value, min, max, step } = props;

    const [ protectedValue, setProtectedValue ] = useState(value);

    function handleProtectedValue(e) {
        // make this function to never set value over max and under min
        // also guard value so updateLight (a.k.a. handleChange)
        // uses only protected value
        
        // first suggested solution is to take input value (props.value)
        // then prevent it from going outside of bonds
        // then calling handleChange inside this method
        // and finally replacing onChange call with this function
        if (value > max) {
            setProtectedValue(max);
        } else if (value < min) {
            setProtectedValue(min);
        } else {
            setProtectedValue(value);
        }
        console.log("value: ", value, ", protectedValue: ", protectedValue);
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
                    onKeyUp={e => handleProtectedValue(e)}
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
            {handleTraitType()}
        </div>
    );
}