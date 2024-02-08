import { useState, useEffect, MouseEvent } from "react";

interface Slider {
    name: string
    min: number,
    max: number,
    step: number,
    value: number,
    defaultValue: number,
    handleChange: (value: number) => void
}
const Slider = ( {name, min, max, step, value, defaultValue, handleChange}: Slider)  => {

    const [ handledValue, setHandledValue ] = useState<number>(value);
    const [ startingPosX, setStartingPosX ] = useState<number>(0);
    const [ isMouseDown, setIsMouseDown ] = useState<boolean>(false);

    function handleValue(newValue: number) {
        if (!isNaN(newValue)) { // TODO -> check if this check is redundant after introducing types
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

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
            const calculatedX = e.clientX - startingPosX;
            
            handleValue(handledValue + calculatedX * step);
        };

        const handleMouseUp = () => {
            setIsMouseDown(false)
        };

        if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
        };
    }, [isMouseDown]);

    useEffect(() => {
        if (handledValue != 0) {
            handleChange(handledValue);
        }
    }, [handledValue])

    function handleResetDefault() {
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

export default Slider;