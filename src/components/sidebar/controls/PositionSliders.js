import { useState } from "react";

export function PositionSliders(props) {
    const { min, max, value } = props;

    const [ handledPosition, setHandledPosition ] = useState(value);

    function handleValue(newValue) {
        if (!isNaN(newValue)) {} 
        else if (newValue > max) {
            setHandledPosition(max);
        } else if (newValue < min) {
            setHandledPosition(min);
        } else {
            setHandledPosition(Math.round(newValue * 100) / 100);
        }
    }

    function handleCoordinateSlider(index) {
        return (
            <div className="input-slider slider-array-three" 
                value={handledPosition[index]}
                onMouseDown={() => {}}
            >
                <i className="slider-arrow left">&#60;</i>
                <span className="slider-value">{handledPosition[index]}</span>
                <i className="slider-arrow right">&#62;</i>
            </div>
        );
    }

    return (
        <div className="trait">
            <label className="trait-name">{props.name}</label>
            {handleCoordinateSlider(0)}
        </div>
    );
}