import React from "react";
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";

import { ColorPicker } from "../common/controls/ColorPicker";
import { SpotLightProperties } from "../../../../models/Light";
import { SliderLongContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderLongContainer";
import { ButtonReset } from "../common/controls/ButtonReset";
import { SlidersArray } from "../common/controls/SlidersArray";
import { TraitSingle } from "../common/traits/TraitSingle";
import { Slider } from "../common/controls/Slider";

type Props = {
    id: string,
    properties: SpotLightProperties,
}

export const LightControlsSpotlight = ( {id, properties}: Props ) => {
    const { updateLightProperties } = useSceneObjectsContext();

    return (
        <>
            <TraitSingle name="Position" >
                <SlidersArray
                    value={properties.position}
                    step={0.01}
                    handleChange={(val) => updateLightProperties(id, {position: val} )} />
            </TraitSingle>

            <TraitSingle name="Color" >
                <ColorPicker
                    currentColor={properties.color}
                    handleChange={(val) => updateLightProperties(id, {color: val} )}  />
            </TraitSingle>

            <TraitSingle name="Intensity">
                <SliderLongContainer>
                    <Slider
                        value={properties.intensity}
                        handleChange={(val) => updateLightProperties(id, {intensity: val} )} 
                        min={0} max={3} step={0.005} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateLightProperties(id, {intensity: 1} )} />
            </TraitSingle>

            <TraitSingle name="Distance">
                <SliderLongContainer>
                    <Slider
                        value={properties.distance}
                        handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                        min={0} max={100} step={0.1} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateLightProperties(id, {distance: 10} )} />
            </TraitSingle>

            <TraitSingle name="Angle">
                <SliderLongContainer>
                    <Slider
                            value={properties.angle}
                            handleChange={(val) => updateLightProperties(id, {angle: val} )} 
                            min={0} max={1} step={0.002} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateLightProperties(id, {angle: 0.6} )} />
            </TraitSingle>
                
            <TraitSingle name="Penumbra">
                <SliderLongContainer>
                    <Slider
                        value={properties.penumbra}
                        handleChange={(val) => updateLightProperties(id, {penumbra: val} )} 
                        min={0} max={1} step={0.002} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateLightProperties(id, {penumbra: 0.6} )} />
            </TraitSingle>
        </>
    );
}