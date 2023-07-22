import { useEffect, useState } from "react";

export function PositionSliders(props) {
    const { step, value, handleChange} = props;

    const [ handledPosition, setHandledPosition ] = useState(value);

    const [ currentSlider, setCurrentSlider ] = useState();
    const [ startingPosX, setStartingPosX ] = useState();
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    function handlePosition(newArray) {
        if (newArray.some((element) => isNaN(element))) {
            setHandledPosition(0);
        } else {
            setHandledPosition(newArray);
        }
    }

    const handleMouseDown = (e) => {
        setStartingPosX(e.clientX);
        setCurrentSlider(e.currentTarget);
        setIsMouseDown(true);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            const calculatedX = event.clientX - startingPosX;
            const currentIndex = currentSlider.getAttribute('index');

            const newHandledPosition = [...handledPosition];
            newHandledPosition[currentIndex] = (handledPosition[currentIndex] + calculatedX * step);

            handlePosition(newHandledPosition);
        };

        const handleMouseUp = () => {
            setIsMouseDown(false)
        };

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
        if (handledPosition !== 0) {
            handleChange(handledPosition);
        }
    }, [handledPosition])

    // take each value from [a,b,c]. Then, for each create a slider that updates whole val (but only for it's index)
    // You can create common method for updating state, it'll need to accept index to know which part to update
    function handleCoordinateSlider() {
        return (
            <>
            {handledPosition.map((position, index) => {
                return (
                    <div className="input-slider slider-array-three" 
                        key={index}
                        index={index}
                        onMouseDown={(e) => {
                            handleMouseDown(e)
                        }}
                    >
                        <i className="slider-arrow left">&#60;</i>
                        <span className="slider-value">{position}</span>
                        <i className="slider-arrow right">&#62;</i>
                    </div>
                )
            })}
            </>
        );
    }

    return (
        <div className="trait">
            <label className="trait-name">{props.name}</label>
            {handleCoordinateSlider()}
        </div>
    );
}