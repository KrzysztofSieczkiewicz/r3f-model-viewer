import React from "react";
import { useEffect, useState } from "react";
import { SliderNumeric } from "./SliderNumeric";
import { SliderArrayContainer } from "./sliderContainers/SliderArrayContainer";
import { normalizeArrayByIndex } from "../../../utils/mathUtil";
import { AxesLockButton } from "../common/AxesLockButton";

type Props = {
    step: number,
    value: [number,number,number],
    handleChange: (array: [number,number,number]) => void,
}


export const ScaleSliders = ({step, value, handleChange}: Props) => {
    const [ localValue, setLocalValue ] = useState<[number,number,number]>(value);
    const [ axesLocked, setAxesLocked] = useState(false);

    // ALLOW SINGLE SLIDER TO UPDATE PROPER VALUE
    const handleSingleSlider = (index: number, newValue: number) => {
        

        // IF LOCK AXES IS TOGGLED
        if(axesLocked) {
            // NORMALIZE INPUTS BY CURRENT INDEX
            const scales = normalizeArrayByIndex(localValue, localValue[index]);

            const scaledValue = localValue.map( (value, index) => {
                return (value-newValue) * scales[index];
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
                    <SliderArrayContainer>
                        <SliderNumeric 
                            key={index}
                            step={step}
                            rounding={1}
                            value={value}
                            handleChange={(val: number)=>handleSingleSlider(index, val)} />
                    </SliderArrayContainer>
                )
            })}
        </>
    );
}