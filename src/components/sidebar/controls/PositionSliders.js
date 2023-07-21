import { useEffect, useState } from "react";

export function PositionSliders(props) {
    const { step,
        value } = props;

    const [ handledPosition, setHandledPosition ] = useState(value);
    console.log(handledPosition);
    const [ currentSlider, setCurrentSlider ] = useState();
    const [ startingPosX, setStartingPosX ] = useState();
    const [ isMouseDown, setIsMouseDown ] = useState(false);

    function handlePosition(newValue, index) {
        const updatedArray = [...handledPosition];
        updatedArray[index] = Math.round(newValue * 100) / 100;

        if (!isNaN(newValue[index])) {
            setHandledPosition(0);
        } else {
            setHandledPosition(updatedArray);
        }

        //console.log("Value on index: ", index, " was set to: ", updatedArray[index]);
    }

    const handleMouseDown = (e) => {
        setStartingPosX(e.clientX);
        setCurrentSlider(e);
        setIsMouseDown(true);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            const calculatedX = event.clientX - currentSlider.clientX;
            
            handlePosition(handledPosition + calculatedX * step, currentSlider.target.dataset.key);
            console.log(currentSlider.target.dataset.key);
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

    // take each value from [a,b,c]. Then, for each create a slider that updates whole val (but only for it's index)
    // You can create common method for updating state, it'll need to accept index to know which part to update
    function handleCoordinateSlider() {
        return (
            <>
            {handledPosition.map((position, index) => {
                return (
                    <div className="input-slider slider-array-three" 
                        key={index}
                        data-key={index}
                        onMouseDown={(e) => {
                            handleMouseDown(e)
                            console.log(position.id)
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