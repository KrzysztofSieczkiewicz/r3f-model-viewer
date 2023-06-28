/*
Blender style slider:
Wide box, which as a whole is a slider
With a value displayed in the middle
On hover - small arrows on both sides to move value by small percent
*/

import { useEffect, useRef, useState } from "react";

import "./slider.css"

export function Slider({ min, max, value, step }) {
    const [range, setRange] = useState(value);
    const [inputValue, setInputValue] = useState(value);
    const sliderRef = useRef(null);

    function handleSliderInput() {
        const range = max - min;
        const distance = sliderRef.current.value - min;
        const percentage = (distance / range) * 100;
        setRange(percentage);
        setInputValue(sliderRef.current.value);
    }

    function handleNumberInput(e) {
        const newValue = parseInt(e.target.value);

        if (newValue < min) {
            setInputValue(min);
            setRange(0);
        } else if (newValue > max) {
            setInputValue(max);
            setRange(100);
        } else {
            setInputValue(newValue);
            const range = max - min;
            const distance = newValue - min;
            const percentage = (distance / range) * 100;
            setRange(percentage);
        }
    }

    useEffect(() => {
        handleSliderInput();
    }, [sliderRef])

    return(
        <>
            <div className="range-slider">
                <div className="slider-container">
                    <input 
                        type="range"
                        onInput={handleSliderInput}
                        value={inputValue}
                        min={min} max={max}
                        ref={sliderRef}
                        step={step}
                        className="slider"
                    />
                    <div 
                        className="slider-thumb"
                        style={{ left: `calc(${range}% - 0.5em)` }}
                    ></div>
                    <div 
                        className="progress"
                        style={{ width: `${range}%` }}
                    ></div>
                </div>
                <div className="slider-values">
                    <input 
                        type="number"
                        onInput={handleNumberInput}
                        value={inputValue}
                        min={min} max={max}
                        step={step}
                        className="number-input"
                    />
                </div>
            </div>
        </>
    );
}