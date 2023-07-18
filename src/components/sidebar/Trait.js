import { useEffect, useState } from "react";

import './trait.css';

export function Trait(props) {
    const { min, max, step,
    value, handleChange} = props;

    const [ handledValue, setHandledValue ] = useState(value);
    const [ startingPosX, setStartingPosX ] = useState();
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    function handleValue(newValue) {
        const inputValue = Math.round(newValue * 100) / 100;

        if (!isNaN(inputValue)) {
            setHandledValue(0);
        }
        if (inputValue > max) {
            setHandledValue(max);
        } else if (inputValue < min) {
            setHandledValue(min);
        } else {
            setHandledValue(inputValue);
        }
    }

    const handleMouseDown = (e) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            const calculatedX = event.clientX - startingPosX;
            
            handleValue(handledValue + calculatedX * step);
        };

        const handleMouseUp = () => {
            setIsMouseDown(false)
        };

        if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    useEffect(() => {
        if (handledValue !== 0) {
            handleChange(handledValue);
        }
    }, [handledValue])

    function handleResetDefault() {
        handleValue(props.defaultValue);
        handleChange(props.defaultValue);
    }

    
    function handleTraitType() {
        if(props.type === "number-slider") {
            return (
                <div className="input-slider slider-single" 
                    value={handledValue}
                    onMouseDown={(e) => handleMouseDown(e)}
                >
                    <i className="slider-arrow left">&#60;</i>
                    <span className="slider-value">{handledValue}</span>
                    <i className="slider-arrow right">&#62;</i>
                </div>
            );
        }
    }

    return (
        <div className="trait">
            <label className="trait-name">{props.name}</label>
            {handleTraitType()}
            <button className="reset-default-btn"
                onClick={handleResetDefault}
            >&#8635;</button>
        </div>
    );
}