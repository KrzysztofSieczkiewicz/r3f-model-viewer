import React from "react";
import { useEffect, useState } from "react";
import { SliderNumeric } from "./SliderNumeric";
import { SliderArrayContainer } from "./sliderContainers/SliderArrayContainer";
import { normalizeArrayByIndex } from "../../../utils/mathUtil";

type Props = {
    step: number,
    value: [number,number,number],
    handleChange: (array: [number,number,number]) => void,

    axesLock?: boolean,
    rounding?: number
}


export const ScaleSliders = ({step, value, handleChange, axesLock = false, rounding = 2}: Props) => {
    const [ localValue, setLocalValue ] = useState<[number,number,number]>(value);

    // ALLOW SINGLE SLIDER TO UPDATE PROPER VALUE
    const handleSingleSlider = (index: number, newValue: number) => {
        if(axesLock) {
            const scales = normalizeArrayByIndex(localValue, localValue[index]);
            const scaledValue = localValue.map( (value, i) => {
                return value+(newValue-localValue[index]) * scales[i];
            }) as [number, number, number]

            handleChange(scaledValue);
        } else {
            const value = [...localValue] as [number, number, number];
            value[index] = newValue;
            handleChange(value);
        }
    }

    // UPDATE THE VALUE IF PROVIDED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <>
            {localValue.map((value: number, index: number) => {
                return (
                    <>
                        <SliderArrayContainer>
                            <SliderNumeric 
                                key={index}
                                step={step}
                                rounding={rounding}
                                value={value}
                                handleChange={(val: number)=>handleSingleSlider(index, val)} />
                        </SliderArrayContainer>
                    </>
                )
            })}
        </>
    );
}