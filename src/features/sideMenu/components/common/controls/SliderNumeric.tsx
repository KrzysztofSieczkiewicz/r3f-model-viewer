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
}


// TODO: MOVE CURSOR TO ANOTHER SIDE OF THE SCREEN IF MOVED TOO CLOSE TO THE EDGE
export const SliderNumeric = ({increment=0.01, value, handleChange, min=-Infinity, max=Infinity, rounding=2, displayValue=true}: Props) => {
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const indicatorColors = ["#F03A47", "#018E42", "#276FBF"];

    const handleInput = (newValue: number) => {
        if (newValue >= min &&
            newValue <= max)
            handleChange(newValue);
    }

    const handleMouseUp = () =>  setIsMouseDown(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    const handleMouseMove = (event: MouseEvent) => {
        const calculatedX = event.clientX - startingPosX;
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

    const renderSliderValue = () => {
        if(displayValue) return roundNumber(value, rounding)
    }

    // TODO: REINTRODUCE AXIS COLOR INDICATOR
    return (
        <>
            <div className={styles.axisColorIndicator} style={{ backgroundColor: indicatorColors[0] }}/>
            <div className={styles.track} 
                onMouseDown={(e) => handleMouseDown(e)} >
                {/* <span className={styles.arrow}>&#60;</span> */}
                {<span className={styles.value}>{renderSliderValue()}</span>}
                {/* <span className={`${styles.arrow} ${styles.right}`}>&#62;</span> */}
            </div>
        </>
    );
}