import React from "react";
import { useEffect, useState } from "react";
import styles from './ScaleSliders.module.css';
import commonStyles from '../Sidebar.module.css';
import { normalizeArrayByIndex, roundNumber } from "../../../utils/mathUtil";
import { AxisLockButton } from "./AxisLockButton";

type Props = {
    name: string,
    step: number,
    value: [number,number,number],
    handleChange: (array: [number,number,number]) => void,
}

// TODO: CONSIDER ADDING CURSOR TO ANOTHER SIDE OF THE SCREEN IF MOVED TOO CLOSE TO THE EDGE
export const ScaleSliders = (props: Props) => {
    const { name, step, value, handleChange } = props;

    const [ localValue, setLocalValue ] = useState<[number,number,number]>(value);
    // RED GREEN BLUE - TODO: MOVE THIS TO GLOBAL CONSTANTS
    const indicatorColors = ["#F03A47", "#018E42", "#276FBF"];

    const [ currentSlider, setCurrentSlider ] = useState<HTMLDivElement | null>(null);
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const [ axesLocked, setAxesLocked ] = useState(true);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setCurrentSlider(e.currentTarget);
        setIsMouseDown(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!currentSlider) return;

        const calculatedMouseMovement = (event.clientX - startingPosX) * step;
        const currentSliderIndex = Number(currentSlider.getAttribute('data-index'));
        
        // SCALE UNIFORMLY
        if (axesLocked) {
            const scales = normalizeArrayByIndex(localValue, localValue[currentSliderIndex]);
            const newValue = localValue.map( (value, index) => {
                return value + (calculatedMouseMovement * scales[index]);
            }) as [number, number, number]
            
            handleChange(newValue);
            return;
        }
        // SINGLE VALUE CHANGE
        const newValue = [...localValue] as [number,number,number]
        newValue[currentSliderIndex] = localValue[currentSliderIndex] + calculatedMouseMovement;
        handleChange(newValue);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    
    useEffect(() => {
        if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        };
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    // UPDATE LOCAL VALUE IF PROVIDED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <div className={commonStyles.traitContainer}>
            <label className={commonStyles.traitName}>{name}</label>
            {localValue.map((value: number, index: number) => {
                return (
                    <div className={styles.slider} 
                        key={index}
                        data-index={index}
                        onMouseDown={(e) =>  handleMouseDown(e) }
                    >
                        <div className={styles.axisColorIndicator} style={{ backgroundColor: indicatorColors[index] }}/>
                        <span className={styles.arrow} />
                        <span className={styles.value}>{roundNumber(value, 2)}</span>
                        <span className={`${styles.arrow} ${styles.right}`}>&#62;</span>
                    </div>
                );
            })}
            <AxisLockButton />
        </div>
    );
}