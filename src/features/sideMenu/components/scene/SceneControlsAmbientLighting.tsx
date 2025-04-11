import React from "react";
import { useScene } from "../../../../components/contexts/SceneContext";
import { TraitSingle } from "../common/traits/TraitSingle";
import { Checkbox } from "../../../../components/sidebar/controls/buttons/Checkbox";
import { ColorPicker } from "../common/controls/ColorPicker";
import { SliderLongContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderLongContainer";
import { SliderLimited } from "../../../../components/sidebar/controls/SliderLimited";
import { ResetButton } from "../../../../components/sidebar/controls/buttons/ResetButton";


export const SceneControlsAmbientLighting = () => {
    const [ scene, setScene ] = useScene();
    
    return (
        <>
            <TraitSingle name="Active">
                <Checkbox
                    value={scene.isAmbientActive}
                    handleChange={(val) => setScene( {isAmbientActive: val} )} />
            </TraitSingle>

            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={scene.ambientColor}
                    handleChange={(val) =>  setScene({ambientColor: val}) } />
            </TraitSingle>

            <TraitSingle name="Intensity">
                <SliderLongContainer>
                    <SliderLimited
                        value={scene.ambientIntensity}
                        handleChange={(val) =>  setScene({ambientIntensity: val}) }
                        min={0} max={1} step={0.001} />
                </SliderLongContainer>
                <ResetButton onReset={() => setScene({ambientIntensity: 0.1})} />
            </TraitSingle>
                
        </>
    );
}