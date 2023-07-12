import { useEffect, useRef, useState } from "react";

export function Trait(props) {
    const { min, max, step,
    value, handleChange} = props;

    const [ handledValue, setHandledValue ] = useState(value);
    const [ startingPosX, setStartingPosX ] = useState();
    const [isMouseDown, setIsMouseDown ] = useState(false);

    function handleValue(newValue) {
        const inputValue = Math.round(newValue * 100) / 100;

        if (!isNaN(inputValue)) {
            setHandledValue(0);
        }
        if (inputValue > max) {
            setHandledValue(max);
            console.log("Too high");
        } else if (inputValue < min) {
            setHandledValue(min);
            console.log("Too low");
        } else {
            setHandledValue(inputValue);
            console.log("All good");
        }
    }

    const handleMouseDown = (e) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            const calculatedX = event.clientX - startingPosX;
            const newVal = handledValue + calculatedX * step;
            
            handleValue(newVal);
        };

        const handleMouseUp = () => {
            setIsMouseDown(false)
        };

        if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }

        handleChange(handledValue);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    function handleResetDefault() {
        handleValue(props.defaultValue);
        handleChange(props.defaultValue);
    }

    
    function handleTraitType() {
        if(props.type === "number-slider") {
            return (
                <div className="input-test number-slider" 
                    value={handledValue}
                    onMouseDown={(e) => handleMouseDown(e)}
                >
                    <i className="arrow left">&#60;</i>
                    {handledValue}
                    <i className="arrow right">&#62;</i>
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

/*

        //handle props types
    function handleTraitType() {
        if(props.type === 'number-input') {
            return (
                <></>
            );
        }
    }
*/