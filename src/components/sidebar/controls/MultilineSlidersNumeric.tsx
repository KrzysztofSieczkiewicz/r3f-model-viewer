import React, { useEffect, useRef, useState } from "react";
import styles from './MultilineSlidersNumeric.module.css';
import { AxesLockButton } from "./buttons/AxesLockButton";
import { normalizeArrayByIndex } from "../../../utils/mathUtil";
import { SliderNumeric } from "./SliderNumeric";
import { SliderMediumContainer } from "./sliderContainers/SliderMediumContainer";
import { SingleLineTrait } from "../commons/traitContainers/SingleLineTrait";

type SliderProps<T> = {
    property: (keyof T),
    value: number, 
    name: string,
    step: number,
    rounding: number
    min?: number, 
    max?: number, 
}

type Props<T> = {
    values: SliderProps<T>[];
    handleChange: (change: Partial<T>) => void;
    displayName: string
}

export const MultilineSlidersNumeric = <T,>({displayName, values, handleChange}: Props<T>) => {

    const [isLocked, setIsLocked] = useState(true);

    const [startingPointYOffset, setStartingPointOffset] = useState(0);
    const [rowHeight, setRowHeight] = useState(0);
    const gridContainerRef = useRef<HTMLDivElement>(null);

    // Handles component size and children number
    useEffect(() => {
        if(!gridContainerRef.current) return;

        const calcContainerHeight = gridContainerRef.current.offsetHeight;
        const calcRowHeight = calcContainerHeight / values.length;
        const calcStartingPointOffset = calcRowHeight / 2;

        setRowHeight(calcRowHeight);
        setStartingPointOffset(calcStartingPointOffset);
    }, [])

    const drawGuideLinePath = (index: number) => {
        // Determine index distance from the middle
        const avgIndex= Math.round(values.length) / 2;
        const dist = avgIndex - index - 0.5;
        // Declare line lengths
        const horizontalLineLength = 18 + Math.abs(2 * dist);
        const verticalLineHeight = dist * rowHeight;
        // Determine starting points
        const startPointX = 0;
        const startPointY = index * rowHeight + startingPointYOffset;

        return (
            <svg className={styles.svg} key={index}>
                <g>
                    <line stroke="black" strokeWidth="1" 
                        x1={startPointX} y1={startPointY}
                        x2={startPointX + horizontalLineLength} y2={startPointY} />
                    <line stroke="black" strokeWidth="1"
                        x1={startPointX + horizontalLineLength} y1={startPointY}
                        x2={startPointX + horizontalLineLength} y2={startPointY+verticalLineHeight} />
                </g>
            </svg>
        );
    }

    const renderSliderNumeric = (entry: SliderProps<T>, index: number) => {
        return (
            <SingleLineTrait name={entry.name} key={index}>
                <SliderMediumContainer>
                    <SliderNumeric
                        {...entry.min !== undefined && { min: entry.min}}
                        {...entry.max !== undefined && { max: entry.max}}
                        step={entry.step} 
                        rounding={entry.rounding} 
                        value={entry.value} 
                        handleChange={(val) => handleSliderChange(index, val)} />
                </SliderMediumContainer>
            </SingleLineTrait>
        );
    }

    const handleSliderChange= (index: number, newValue: number) => {
        const rawValues = values.map(entry => entry.value);
        let change: Partial<T>;

        if(isLocked) {
            const scales = normalizeArrayByIndex(rawValues, rawValues[index]);
            const normalizedValues = rawValues.map( (value, i) => {
                return value+(newValue-rawValues[index]) * scales[i] 
            });

            change = normalizedValues.reduce((acc, value, i) => {
                const entry = values[i];
                acc[entry.property] = value as any;
                return acc;
            }, {} as Partial<T>);
        } else {
            change = { [values[index].property]: newValue } as Partial<T>;
        }
        handleChange(change);
    }

    // TODO: PRESENT <SliderNumeric> IN A MORE READABLE WAY
    return (
        <>
            <label className={styles.containerName}>{displayName}</label>
            <div ref={gridContainerRef} className={styles.gridContainer}>
                <div className={styles.column1}>
                    {values.map((entry, index) => {return renderSliderNumeric(entry, index);} )}
                </div>

                <div className={styles.column2}>
                    {values.map((entry, index) => {return drawGuideLinePath(index);} )}
                    
                    <div className={styles.buttonContainer}>
                        <AxesLockButton locked={isLocked} setLocked={() => setIsLocked(!isLocked)} />
                    </div>
                </div>
            </div>
        </>
    );
}