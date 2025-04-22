import React, { RefObject, useRef } from "react";
import { useEffect, useState } from "react";
import styles from './Slider.module.css';

import { roundNumber } from "../../../../../utils/mathUtil";
import { useInterceptClickOutside } from "../../../hooks/useInterceptClickOutside";


type Props = {
    value: number,
    handleChange: (newValue: number) => void,
    
    min?: number,
    max?: number,
    step?: number,
    rounding?: number,
    displayValue?: boolean,
    displayedUnit?: string,
}

export const Slider = ({
        value, 
        handleChange, 
        min=-Infinity, 
        max=Infinity,
        step=0.01, 
        rounding=2, 
        displayValue=true, 
        displayedUnit=""
    }: Props) => {
        
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);
    const [ isInputMode, setIsInputMode ] = useState(false);
    const [ localInputValue, setLocalInputValue ] = useState(value);

    useEffect( () => {
        console.log(value)
        setLocalInputValue(roundNumber(value, rounding))
    }, [value])


    const inputFieldRef = useRef<HTMLInputElement>(null);

    const BackdropInteractionCatcher = useInterceptClickOutside(
        [inputFieldRef],
        isInputMode,
        () => handleInputConfirm(localInputValue)
    )

    const handleSliderChange = (newValue: number) => {
        if (newValue < min) {
            handleChange(min);
        } else if (newValue > max) {
            handleChange(max);
        } else {
            handleChange(newValue);
        }
    }

    // TODO: CURRENT - Handle NaN in inputs, allow for both . and , points
    // remove redundant methods that do the same, improve local values handling
    const handleInputConfirm = (newValue: number) => {
        handleSliderChange(newValue);
        setIsInputMode(false)
    }

    const handleMouseUp = () =>  setIsMouseDown(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    const handleMouseMove = (e: MouseEvent) => {
        if(isInputMode) return;

        const calculatedX = e.clientX - startingPosX;
        handleSliderChange(value + calculatedX * step);
    };

    useEffect(() => {
        if(!isMouseDown) return;
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    const renderInput = () => {

        return (
            <>
                <BackdropInteractionCatcher />
                <input 
                    ref={inputFieldRef} 
                    className={styles.inputField}
                    type="text"
                    step="0.01"
                    value={localInputValue}
                    autoFocus
                    onChange={(e) => setLocalInputValue(+e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key !== 'Enter') return;
                        handleInputConfirm(localInputValue)
                    }}  />
            </>
        );
    }

    const renderSlider = () => {
        let displayedValueElement = null;
        if(displayValue) {
            const displayedValue = roundNumber(value, rounding)
                .toString()
                .concat(displayedUnit)

            displayedValueElement = (
                <span className={styles.value}>
                    {displayedValue}
                </span>)
        }

        let displayedTrackElement = null;
        if (min!=Infinity || max !=Infinity) {
            const trackWidth = value / (max-min) * 100;

            displayedTrackElement = (
                <span
                    className={styles.sliderBar}
                    style={{width: `${trackWidth}%`}}/>
            );
        }

        return (
            <>
                {displayedTrackElement}
                {displayedValueElement}
            </>
        );
    }

    const render = () => {
        if(!isInputMode) {
            return renderSlider()
        } else {
            return renderInput()
        }
    }

    return (
        <div className={styles.track}
            onMouseDown={(e) => handleMouseDown(e)}
            onDoubleClick={() => setIsInputMode(true)} >
            {render()}
        </div>
            
    );
}