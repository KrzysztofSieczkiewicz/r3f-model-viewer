import React from "react";

import { Checkbox } from "../controls/buttons/Checkbox";
import { ColorPicker } from "../controls/ColorPicker";
import { SliderLimited } from "../controls/SliderLimited";
import { useScene } from "../../contexts/SceneContext";
import { ResetButton } from "../controls/buttons/ResetButton";
import { SingleLineTrait } from "../commons/traitContainers/SingleLineTrait";
import { SliderLongContainer } from "../controls/sliderContainers/SliderLongContainer";

export const AmbientLightControls = () => {
    const [ scene, setScene ] = useScene();
    
    return (
        <>
            <SingleLineTrait name="Active">
                <Checkbox
                    value={scene.isAmbientActive}
                handleChange={(val) => setScene( {isAmbientActive: val} )} />
            </SingleLineTrait>

            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={scene.ambientColor}
                    handleChange={(val) =>  setScene({ambientColor: val}) } />
            </SingleLineTrait>

            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderLimited
                        value={scene.ambientIntensity}
                        handleChange={(val) =>  setScene({ambientIntensity: val}) }
                        min={0} max={1} step={0.001} />
                </SliderLongContainer>
                <ResetButton onReset={() => setScene({ambientIntensity: 0.1})} />
            </SingleLineTrait>
                
        </>
    );
}