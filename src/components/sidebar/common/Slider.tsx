import React from "react";
import { useEffect, useState } from "react";

type Props = {
    name: string,
    min: number,
    max: number,
    step: number,
    value: number,
    defaultValue: number,
    handleChange: (handledValue: number) => void
}

export const Slider = (props: Props) => {
    const { name, min, max, step, value, defaultValue, handleChange} = props;

    const [ localValue, setLocalValue ] = useState(value);
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const handleInput = (newValue: number) => {
        if (newValue > max) {
            handleChange(max);
        } else if (newValue < min) {
            handleChange(min);
        } else {
            handleChange(newValue);
        }
    }

    // ROUND DISPLAYED VALUE
    const roundDisplayed = (number: number) => {
        return Math.round((number) * 100) / 100;
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    const handleMouseMove = (event: MouseEvent) => {
        const calculatedX = event.clientX - startingPosX;
        
        handleInput(localValue + calculatedX * step);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false)
    };

    useEffect(() => {
        if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    // UPDATE THE VALUE IF PROVIDED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // RESET VALUE TO DEFAULT
    const handleResetDefault = () => {
        handleInput(defaultValue);
        handleChange(defaultValue);
    }

    // TODO: add doubleclick to set value numerically
    // maybe wrap <span> in <div> with onDoubleClick that will return <input> instead?
    // and detect outside click or return etc. to return to <span>
    return (
        <div className="trait">
            <label className="trait-name">{name}</label>
            <div className="input-slider slider-single" 
                onMouseDown={(e) => handleMouseDown(e)}
            >
                <span className="slider-arrow left"
                onClick={() => handleInput(localValue - step)} > &#60; </span>

                <span className="slider-value"
                onDoubleClick={() => console.log("DoubleClicked")}
                >{roundDisplayed(value)}</span>

                <span className="slider-arrow right"
                onClick={() => handleInput(localValue + step)} > &#62; </span>
            </div>
            <button className="reset-default-btn"
                onClick={handleResetDefault}
            >&#8635;</button>
        </div>
    );
}