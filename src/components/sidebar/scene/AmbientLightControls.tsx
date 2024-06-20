import React from "react";

import { Checkbox } from "../controls/Checkbox";
import { ColorPicker } from "../controls/ColorPicker";
import { SliderLimited } from "../controls/SliderLimited";
import { useScene } from "../../contexts/SceneContext";
import { ResetButton } from "../controls/buttons/ResetButton";
import { ItemTrait } from "../commons/ItemTrait";
import { SliderSingleContainer } from "../controls/sliderContainers/SliderSingleContainer";

export const AmbientLightControls = () => {
    const [ scene, setScene ] = useScene();
    
    return (
        <>
            <ItemTrait name="Active">
                <Checkbox
                    value={scene.isAmbientActive}
                handleChange={(val) => setScene( {isAmbientActive: val} )} />
            </ItemTrait>

            <ItemTrait name="Color">
                <ColorPicker
                    currentColor={scene.ambientColor}
                    handleChange={(val) =>  setScene({ambientColor: val}) } />
            </ItemTrait>

            <ItemTrait name="Intensity">
                <SliderSingleContainer>
                    <SliderLimited
                        value={scene.ambientIntensity}
                        handleChange={(val) =>  setScene({ambientIntensity: val}) }
                        min={0} max={1} step={0.001} />
                </SliderSingleContainer>
                <ResetButton onReset={() => setScene({ambientIntensity: 0.1})} />
            </ItemTrait>
                
        </>
    );
}