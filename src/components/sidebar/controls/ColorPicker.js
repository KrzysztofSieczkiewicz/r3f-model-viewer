import { HexColorPicker } from "react-colorful";

export function ColorPicker(props) {



    return (
        <div className="trait">
            <label className="trait-name">{props.name}</label>
            <div className="color-picker-container">
                <HexColorPicker color={props.color} onChange={console.log("change-color")} />
            </div>
        </div>
    );
}