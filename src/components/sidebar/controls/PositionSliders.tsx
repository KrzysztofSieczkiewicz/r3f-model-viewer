import React from "react";
import { useEffect, useState } from "react";
import styles from './PositionSliders.module.css';
import { roundNumber } from "../../../utils/mathUtil";

type Props = {
    step: number,
    value: [number,number,number],
    handleChange: (array: [number,number,number]) => void,
}

// TODO: CONSIDER ADDING CURSOR TO ANOTHER SIDE OF THE SCREEN IF MOVED TOO CLOSE TO THE EDGE
export const PositionSliders = ({step, value, handleChange}: Props) => {

    const [ localValue, setLocalValue ] = useState<[number,number,number]>(value);
    const [ currentSlider, setCurrentSlider ] = useState<HTMLDivElement | null>(null);
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    // RED GREEN BLUE
    const indicatorColors = ["#F03A47", "#018E42", "#276FBF"];

    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setCurrentSlider(e.currentTarget);
        setIsMouseDown(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
        const calculatedX = event.clientX - startingPosX;
        const currentIndex = currentSlider?.getAttribute('data-index');
        if (!currentIndex) {
            return;
        }
        const newValue = [...localValue] as [number,number,number];
        newValue[Number(currentIndex)] = localValue[Number(currentIndex)] + calculatedX * step;

        handleChange(newValue);
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

    // UPDATE THE VALUE IF PROVIDED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <>
            {localValue.map((value: number, index: number) => {
                return (
                    <div className={styles.slider} 
                        key={index}
                        data-index={index}
                        onMouseDown={(e) => {
                            handleMouseDown(e)
                        }}
                    >
                        <div className={styles.axisColorIndicator} style={{ backgroundColor: indicatorColors[index] }}/>
                        <span className={styles.arrow}>&#60;</span>
                        <span className={styles.value}>{roundNumber(value, 2)}</span>
                        <span className={`${styles.arrow} ${styles.right}`}>&#62;</span>
                    </div>
                )
            })}
        </>
    );
}