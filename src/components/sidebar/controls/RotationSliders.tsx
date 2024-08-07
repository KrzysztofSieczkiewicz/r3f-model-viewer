import React from "react";
import { useEffect, useState } from "react";
import { SliderNumeric } from "./SliderNumeric";
import { SliderShortContainer } from "./sliderContainers/SliderShortContainer";

type Props = {
    step: number,
    value: [number,number,number],
    handleChange: (array: [number,number,number]) => void,
}


export const RotationSliders = ({step, value, handleChange}: Props) => {
    const [ localValue, setLocalValue ] = useState<[number,number,number]>(value);

    // ALLOW SINGLE SLIDER TO UPDATE PROPER VALUE
    const handleSingleSlider = (index: number, newValue: number) => {
        const value = [...localValue] as [number, number, number];
        value[index] = newValue;

        handleChange(value);
    }

    // UPDATE THE VALUE IF PROVIDED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <>
            {localValue.map((value: number, index: number) => {
                return (
                    <SliderShortContainer key={index}>
                        <SliderNumeric 
                            key={index}
                            step={step}
                            rounding={1}
                            value={value}
                            handleChange={(val: number)=>handleSingleSlider(index, val)} />
                    </SliderShortContainer>
                )
            })}
        </>
    );
}