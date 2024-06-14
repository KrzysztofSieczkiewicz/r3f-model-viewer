import React from "react";

import { Checkbox } from "../common/Checkbox";
import { ColorPicker } from "../common/ColorPicker";
import { Slider } from "../common/Slider";
import { useScene } from "../../contexts/SceneContext";
import { ResetButton } from "../common/ResetButton";

export const AmbientLightControls = () => {
    const [ scene, setScene ] = useScene();
    
    return (
        <>
            <Checkbox
                name={'Active'}
                value={scene.isAmbientActive}
                handleChange={(val) => setScene( {isAmbientActive: val} )} />
            <ColorPicker name="Color"
                currentColor={scene.ambientColor}
                handleChange={(val) =>  setScene({ambientColor: val}) } />
            <Slider name="Intensity"
                value={scene.ambientIntensity}
                handleChange={(val) =>  setScene({ambientIntensity: val}) }
                min={0} max={1} step={0.001}
            >
                <ResetButton handleReset={() => setScene({ambientIntensity: 0.1})} />
            </Slider>
        </>
    );
}