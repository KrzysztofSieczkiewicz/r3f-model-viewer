import { useEffect, useRef, useState } from "react";

export function Trait(props) {
    const { min, max, step,
    value, handleChange} = props;

    const [ protectedValue, setProtectedValue ] = useState(value);


    let isDragging=false;
    let originEvent;
    let startingPosX;
    let currentPosX;
    let calculatedPosX;

    function handleProtectedValue(inputValue) {
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
    }

    //handle props types
    function handleTraitType() {
        if(props.type === 'number-input') {
            return (
                <></>
            );
        } else if(props.type === 'number-slider') {
            return (
                <div className="input-test" onMouseDown={handleMouseDown}>
                    <i className="arrow left">&#60;</i>
                    {protectedValue}
                    <i className="arrow right">&#62;</i>
                </div>
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
            <div className="input-test" 
                onMouseDown={handleMouseDown}
                value={protectedValue}
            >
                <i className="arrow left">&#60;</i>
                {protectedValue}
                <i className="arrow right">&#62;</i>
            </div>
        );
    }

    function handleMouseDown(e) {
        isDragging = true;
        startingPosX = e.clientX;
        originEvent = e;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    

    function handleMouseMove(e) {
        //DEAL WITH THIS
        if (isDragging) {
            currentPosX = e.clientX;
            calculatedPosX = (currentPosX - startingPosX) * 0.01;
            console.log("startingPos: ", startingPosX,
            "currentPos: ", currentPosX,
            "calculatedPos: ", calculatedPosX);

            const newVal = protectedValue + calculatedPosX

            setProtectedValue(newVal)
            console.log(newVal)
            console.log("protectedValue: ", protectedValue);

            /*
            if (protectedValue > max) {
                setProtectedValue(max);
            } else if (protectedValue < min) {
                setProtectedValue(min);
            }

            originEvent.target.value = protectedValue;
            console.log(originEvent.target.value)
            //handleChange(originEvent);
            */
        }
    }
        
    function handleMouseUp() {
        isDragging = false;

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
}