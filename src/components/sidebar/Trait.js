import { useEffect, useRef, useState } from "react";

export function Trait(props) {
    const { min, max, step,
    value, handleChange} = props;

    const [ protectedValue, setProtectedValue ] = useState(value);

    const [ startingPosX, setStartingPosX ] = useState();

    const [isMouseDown, setIsMouseDown ] = useState(false);

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

    const handleMouseDown = (e) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            console.log("Mouse is moving: ", event.clientX);
            console.log(startingPosX, event.clientX)
            let calculatedX = event.clientX - startingPosX;
            console.log(startingPosX, event.clientX);
            console.log("Calculated movement: ", calculatedX);

            const newVal = (protectedValue + calculatedX * 0.01);

            handleProtectedValue(newVal);
        };

        const handleMouseUp = () => {
            setIsMouseDown(false)
            console.log("Mouse is up")
        };

        handleChange(protectedValue);

        if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('mousemove', handleMouseMove);
        };
      }, [isMouseDown]);

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
                value={protectedValue}
                onMouseDown={(e) => handleMouseDown(e)}
            >
                <i className="arrow left">&#60;</i>
                {protectedValue}
                <i className="arrow right">&#62;</i>
            </div>
        );
    }
}

/*
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
        }
    }
*/