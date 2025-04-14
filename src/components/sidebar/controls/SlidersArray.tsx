import React, { useCallback } from "react";
import { useEffect, useState } from "react";

import { normalizeArrayByIndex } from "../../../utils/mathUtil";
import { SliderShortContainer } from "./sliderContainers/SliderShortContainer";
import { SliderNumeric } from "../../../features/sideMenu/components/common/controls/SliderNumeric";
import { ButtonLockAxes } from "../../../features/sideMenu/components/common/controls/ButtonLockAxes";

type ValueArray = [number, number] | [number, number, number];

type Props<T extends ValueArray> = {
    step: number,
    value: T,
    handleChange: (array: T) => void,

    axesLocking?: boolean,
    rounding?: number
}

export const SlidersArray = <T extends ValueArray> ({
    step, value, handleChange, 
    axesLocking = false, 
    rounding = 2
}: Props<T> ) => {
    
    const [ localValue, setLocalValue ] = useState(value);
    const [ axesLocked, setAxesLocked ] = useState(false);

    const handleSliderValueChange = useCallback((index: number, newValue: number) => {
        if(axesLocked) {
            const scales = normalizeArrayByIndex(localValue, localValue[index]);
            const scaledValue = localValue.map( (internalValue, i) => { return internalValue+(newValue-localValue[index]) * scales[i] })
            handleChange(scaledValue as T);
        } else {
            const value = [...localValue] ;
            value[index] = newValue;
            handleChange(value as T);
        }
    }, [axesLocked, localValue, handleChange])

    // UPDATE THE VALUE IF CONTROLLED VALUE WAS CHANGED BY ANOTHER CONTROL
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (<>
        {localValue.map((value: number, index: number) => {
            return (
                <SliderShortContainer key={index}>
                    <SliderNumeric 
                        key={index}
                        step={step}
                        rounding={rounding}
                        value={value}
                        handleChange={(val: number)=>handleSliderValueChange(index, val)} />
                </SliderShortContainer>
            );
        })}
        { axesLocking && <ButtonLockAxes locked={axesLocked} setLocked={(val) => setAxesLocked(val)}/> }
    </>);
}