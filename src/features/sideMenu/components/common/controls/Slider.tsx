import React from "react";
import { useEffect, useState } from "react";
import styles from './Sliders.module.css';

import { roundNumber } from "../../../../../utils/mathUtil";


type Props = {
    value: number,
    handleChange: (newValue: number) => void,
    
    min?: number,
    max?: number,
    increment?: number,
    rounding?: number,
    displayValue?: boolean,
    displayedUnit?: string,
}

// TODO: MOVE CURSOR TO ANOTHER SIDE OF THE SCREEN IF MOVED TOO CLOSE TO THE EDGE

export const Slider = ({
        value, 
        handleChange, 

        min=-Infinity, 
        max=Infinity,
        increment=0.01, 
        rounding=2, 
        displayValue=true, 
        displayedUnit=""
    }: Props) => {
        
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const handleInput = (newValue: number) => {
        if (newValue < min) {
            handleChange(min);
        } else if (newValue > max) {
            handleChange(max);
        } else {
            handleChange(newValue);
        }
    }

    const handleMouseUp = () =>  setIsMouseDown(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    const handleMouseMove = (e: MouseEvent) => {
        const calculatedX = e.clientX - startingPosX;
        handleInput(value + calculatedX * increment);
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


    const renderSliderValue = (value: number) => {
        if(!displayValue) return;

        const roundedValue = roundNumber(value, rounding).toString();
        const displayedValue = roundedValue.concat(displayedUnit)
        return (
            <span className={styles.value}>
                {displayedValue}
            </span>)
            
    }

    const renderSliderTrack = (value: number) => {
        if (min!=Infinity || max !=Infinity) {
            const trackWidth = value / (max-min) * 100;

            return (
                <span
                    className={styles.sliderBar}
                    style={{width: `${trackWidth}%`}}/>
            );
        }
    }

    // TODO: REINTRODUCE AXIS COLOR INDICATOR
    return (
        <>
            <div className={styles.track}
                onMouseDown={(e) => handleMouseDown(e)} >
                {renderSliderTrack(value)}
                {renderSliderValue(value)}
            </div>
        </>
    );
}