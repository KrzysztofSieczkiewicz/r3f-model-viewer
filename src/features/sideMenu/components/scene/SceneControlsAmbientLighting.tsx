import React from "react";
import { useScene } from "../../../common/contexts/SceneContext";
import { TraitSingle } from "../common/traits/TraitSingle";
import { CheckboxItemTrait } from "../common/controls/CheckboxItemTrait";
import { ColorPicker } from "../common/controls/ColorPicker";
import { SliderContainerLong } from "../common/controls/SliderContainerLong";
import { ButtonReset } from "../common/controls/ButtonReset";
import { Slider } from "../common/controls/Slider";


export const SceneControlsAmbientLighting = () => {
    const [ scene, setScene ] = useScene();
    
    return (
        <>
            <TraitSingle name="Active">
                <CheckboxItemTrait
                    value={scene.isAmbientActive}
                    handleChange={(val) => setScene( {isAmbientActive: val} )} />
            </TraitSingle>

            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={scene.ambientColor}
                    handleChange={(val) =>  setScene({ambientColor: val}) } />
            </TraitSingle>

            <TraitSingle name="Intensity">
                <SliderContainerLong>
                    <Slider
                        value={scene.ambientIntensity}
                        handleChange={(val) =>  setScene({ambientIntensity: val}) }
                        min={0} max={1} step={0.001} />
                </SliderContainerLong>
                <ButtonReset onReset={() => setScene({ambientIntensity: 0.1})} />
            </TraitSingle>
                
        </>
    );
}