import React from "react";
import { useEffect, useState } from "react";

type Props = {
    name: string,
    step: number,
    value: [number,number,number],
    handleChange: (array: [number,number,number]) => void,
}

// TODO: CONSIDER ADDING CURSOR TO ANOTHER SIDE OF THE SCREEN IF MOVED TOO CLOSE TO THE EDGE
export const SlidersArray = (props: Props) => {
    const { name, step, value, handleChange } = props;

    const [ handledValue, setHandledValue ] = useState<[number,number,number]>(value);
    // RED GREEN BLUE
    const indicatorColors = ["#F03A47", "#018E42", "#276FBF"];

    const [ currentSlider, setCurrentSlider ] = useState<HTMLDivElement | null>(null);
    const [ startingPosX, setStartingPosX ] = useState(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

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
        const newHandledValue = [...handledValue] as [number,number,number];
        newHandledValue[Number(currentIndex)] = Math.round((handledValue[Number(currentIndex)] + calculatedX * step) * 100) / 100;
        
        setHandledValue(newHandledValue);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false)
    };
    
    useEffect(() => {
               if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMouseDown]);

    useEffect(() => {
        handleChange(handledValue);
    }, [handledValue])

    function handleCoordinateSlider() {
        return (
            <>
            {handledValue.map((value: number, index: number) => {
                return (
                    <div className="input-slider slider-array-three" 
                        key={index}
                        data-index={index}
                        onMouseDown={(e) => {
                            handleMouseDown(e)
                        }}
                    >
                        <div className="position-color-indicator" style={{ backgroundColor: indicatorColors[index] }}/>
                        <span className="slider-arrow left">&#60;</span>
                        <span className="slider-value">{value}</span>
                        <span className="slider-arrow right">&#62;</span>
                    </div>
                )
            })}
            </>
        );
    }

    return (
        <div className="trait">
            <label className="trait-name">{name}</label>
            {handleCoordinateSlider()}
        </div>
    );
}