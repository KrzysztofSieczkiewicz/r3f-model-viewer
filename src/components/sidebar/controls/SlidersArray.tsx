import { useState, useEffect, MouseEvent } from "react";

interface SliderArray {
    name: string,
    step: number,
    value: number[],
    handleChange: (value: number[]) => void
}
// TODO: CONSIDER MOVING CURSOR TO ANOTHER SIDE OF THE SCREEN IF MOVED TOO CLOSE TO THE EDGE -> Blenderwise
export function SlidersArray( {name, step, value, handleChange}: SliderArray) {

    const [ handledValue, setHandledValue ] = useState<number[]>(value);
    const [ currentSlider, setCurrentSlider ] = useState<HTMLDivElement | null>();
    const [ startingPosX, setStartingPosX ] = useState<number>(0);
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    const indicatorColors = ["#F03A47", "#018E42", "#276FBF"]; // RGB

    function handleArrayValues(newArray: number[]) {
        if (newArray.some((element) => isNaN(element))) {
            setHandledValue([0,0,0]);
        } else {
            setHandledValue(newArray);
        }
    }

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setStartingPosX(e.clientX);
        setCurrentSlider(e.currentTarget);
        setIsMouseDown(true);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
            const calculatedX = e.clientX - startingPosX;
            const currentIndex = Number(currentSlider?.getAttribute('data-index'));
            const newHandledPosition = [...handledValue];

            if (currentIndex !== null && currentIndex !== undefined) {
                newHandledPosition[currentIndex] = Math.round((handledValue[currentIndex] + calculatedX * step) * 100) / 100;
                handleArrayValues(newHandledPosition);
            }
        };

        const handleMouseUp = () => {
            setIsMouseDown(false)
        };

        if(isMouseDown) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
        };
    }, [isMouseDown]);

    useEffect(() => {
        if (!handledValue.every((value, index) => value === [0,0,0][index])) {
            handleChange(handledValue);
        }
    }, [handledValue])

    function handleCoordinateSlider() {
        return (
            <>
            {handledValue.map((position, index) => {
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
                        <span className="slider-value">{position}</span>
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