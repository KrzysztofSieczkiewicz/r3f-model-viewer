import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styles from './Sliders.module.css';

import { roundNumber } from "../../../../../utils/mathUtil";
import { useInterceptClickOutside } from "../../../hooks/useInterceptClickOutside";


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
    const [ isInputMode, setIsInputMode ] = useState(false);

    const inputFieldRef = useRef<HTMLInputElement>(null);
    // const BackdropInteractionCatcher = useInterceptClickOutside(
    //     [inputFieldRef],
    //     isInputMode,
    //     () => setIsInputMode(false)
    // )

    const handleSliderChange = (newValue: number) => {
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
        handleSliderChange(value + calculatedX * increment);
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

    const renderInput = (value: number) => {
        return (
            <>
            {/* <BackdropInteractionCatcher /> */}
                {/* targetRef={inputFieldRef}
                isActive={isInputMode}
                onExit={()=>setIsInputMode(false)} /> */}
            <input ref={inputFieldRef} type="number" value={value} style={{position:"relative", zIndex:1}} onChange={(e) => handleSliderChange(+e.target.value)}/>
            </>
        );
    }

    const renderSlider = (value: number) => {
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
            <div className={styles.track}
                onMouseDown={(e) => handleMouseDown(e)}
                onDoubleClick={() => setIsInputMode(true)} >
                {displayedTrackElement}
                {displayedValueElement}
            </div>);
    }

    const render = () => {
        if(!isInputMode) {
            return renderSlider(value)
        } else {
            return renderInput(value)
        }
    }

    // TODO: WHEN RENDERING INPUT - REPLACE SLIDER TRACK WITH THE INPUT FIELD OF THE SAME WIDTH - IT WILL REMOVE EVENT LISTENERS COLLISIONS

    // TODO: REINTRODUCE AXIS COLOR INDICATOR
    return (
        <>
            {render()}
        </>
    );
}