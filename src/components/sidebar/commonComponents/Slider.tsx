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

    const [ handledValue, setHandledValue ] = useState(value);
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const handleValue = (newValue: number) => {
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

    const handleStepChange = (direction: number) => {
        handleValue(handledValue + (step * direction * 10));
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    const handleMouseMove = (event: MouseEvent) => {
        const calculatedX = event.clientX - startingPosX;
        
        handleValue(handledValue + calculatedX * step);
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

    useEffect(() => {
        if (handledValue !== 0) {
            handleChange(handledValue);
        }
    }, [handledValue])

    const handleResetDefault = () => {
        handleValue(defaultValue);
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
                onClick={() => handleStepChange(-1)} > &#60; </span>

                <span className="slider-value"
                onDoubleClick={() => console.log("DoubleClicked")}
                >{handledValue}</span>

                <span className="slider-arrow right"
                onClick={() => handleStepChange(1)} > &#62; </span>
            </div>
            <button className="reset-default-btn"
                onClick={handleResetDefault}
            >&#8635;</button>
        </div>
    );
}