import React, { useRef, useEffect, useState, useCallback } from "react";
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
        
    const [startingPosX, setStartingPosX] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isInputMode, setIsInputMode] = useState(false);

    const inputFieldRef = useRef<HTMLInputElement>(null);


    const handleValueUpdate = useCallback((newValue: number) => {
        const clampedValue = Math.max(min, Math.min(max, newValue));
        handleChange(clampedValue);
    }, [handleChange, max, min]);

    const updateInputValue = useCallback(() => {
        if (!inputFieldRef.current) return;
    
        const valueString = inputFieldRef.current.value.replace(",", ".");
        const valueFloat = parseFloat(valueString);
        if (!isNaN(valueFloat)) {
            handleValueUpdate(valueFloat);
        }
    
        setIsInputMode(false);
    }, [handleValueUpdate]);


    const BackdropInteractionCatcher = useInterceptClickOutside(
        [inputFieldRef],
        isInputMode,
        updateInputValue
    )


    const handleMouseUp = useCallback(() => {
        setIsMouseDown(false);
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isInputMode) return;
        const calculatedX = e.clientX - startingPosX;
        handleValueUpdate(value + calculatedX * step);
    }, [isInputMode, startingPosX, step, value, handleValueUpdate]);

    useEffect(() => {
        if(!isMouseDown) return;
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown, handleMouseUp, handleMouseMove]);

    
    const renderInputComponent = useCallback(() => {
        const localInputValue = roundNumber(value, rounding).toString()

        const handleDisplayedValueUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!inputFieldRef.current) return;
            inputFieldRef.current.value = e.target.value;
        };

        const handleConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && inputFieldRef.current) {
                updateInputValue();
            }
        };

        return (
            <>
                <BackdropInteractionCatcher />
                <input 
                    ref={inputFieldRef} 
                    className={styles.inputField}
                    type="text"
                    step="0.01"
                    defaultValue={localInputValue}
                    autoFocus
                    onChange={(e) => handleDisplayedValueUpdate(e)}
                    onKeyDown={(e) => handleConfirm(e)} />
            </>
        );
    }, [BackdropInteractionCatcher, updateInputValue]);

    const renderSliderComponent = useCallback(() => {
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
        if (min!=Infinity && max !=Infinity) {
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
    }, [displayValue, displayedUnit, max, min, rounding, value]);

    return (
        <div
            className={styles.track}
            onMouseDown={handleMouseDown}
            onDoubleClick={() => setIsInputMode(true)}
        >
            {!isInputMode ? renderSliderComponent() : renderInputComponent()}
        </div>
    );
}