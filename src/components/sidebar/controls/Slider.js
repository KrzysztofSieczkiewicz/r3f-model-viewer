import { useEffect, useState } from "react";

import './controls.css';

export function Slider(props) {
    const { min, max, step,
    value, handleChange} = props;

    const [ handledValue, setHandledValue ] = useState(value);
    const [ startingPosX, setStartingPosX ] = useState();
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    function handleValue(newValue) {
        if (!isNaN(newValue)) {
            setHandledValue(0);
        }
        if (newValue > max) {
            setHandledValue(max);
        } else if (newValue < min) {
            setHandledValue(min);
        } else {
            setHandledValue(Math.round(newValue * 100) / 100);
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


    return (
        <div className="trait">
            <label className="trait-name">{props.name}</label>
            <div className="input-slider slider-single" 
                value={handledValue}
                onMouseDown={(e) => handleMouseDown(e)}
            >
                <i className="slider-arrow left">&#60;</i>
                <span className="slider-value">{handledValue}</span>
                <i className="slider-arrow right">&#62;</i>
            </div>
            <button className="reset-default-btn"
                onClick={handleResetDefault}
            >&#8635;</button>
        </div>
    );
}