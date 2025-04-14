import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
import styles from './Sliders.module.css';

type Props = {
    min: number,
    max: number,
    step: number,
    value: number,
    handleChange: (newValue: number) => void,
}

export const SliderLimited = (props: Props) => {
    const { min, max, step, value, handleChange} = props;

    const [ localValue, setLocalValue ] = useState(value);
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const handleInput = (newValue: number) => {
        if (newValue > max) {
            handleChange(max);
        } else if (newValue < min) {
            handleChange(min);
        } else {
            handleChange(newValue);
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setIsMouseDown(true)
    };

    const handleMouseMove = (event: MouseEvent) => {
        const calculatedX = event.clientX - startingPosX;
        handleInput(localValue + calculatedX * step);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false)
    };

    // TODO: WONT iF(!isMouseDown) return; BE BETTER?
    useEffect(() => {
        if(!isMouseDown) return;
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    // UPDATE THE VALUE IF PROVIDED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const renderSliderPosition = () => {
        const calculatedWidth = localValue / (max-min) * 100;

        return (
            <span
                className={styles.sliderBar}
                style={{ width: `${calculatedWidth}%`}}/>
        );
    }

    // TODO: add doubleclick to set value numerically
    // maybe wrap <span> in <div> with onDoubleClick that will return <input> instead?
    // and detect outside click or return etc. to return to <span>
    return (
        <>
            <div className={styles.track} onMouseDown={(e) => handleMouseDown(e)}>
                {renderSliderPosition()}
            </div>
            
        </>
    );
}