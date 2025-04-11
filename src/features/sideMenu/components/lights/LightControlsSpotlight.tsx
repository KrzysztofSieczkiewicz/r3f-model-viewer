import React from "react";
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";

import { SliderLimited } from "../../../../components/sidebar/controls/SliderLimited";
import { ColorPicker } from "../common/controls/ColorPicker";
import { SpotLightProperties } from "../../../../models/Light";
import { SliderLongContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderLongContainer";
import { ResetButton } from "../../../../components/sidebar/controls/buttons/ResetButton";
import { SlidersArray } from "../../../../components/sidebar/controls/SlidersArray";
import { TraitSingle } from "../common/traits/TraitSingle";

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
                    <SliderLimited
                        value={properties.intensity}
                        handleChange={(val) => updateLightProperties(id, {intensity: val} )} 
                        min={0} max={3} step={0.005} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {intensity: 1} )} />
            </TraitSingle>

            <TraitSingle name="Distance">
                <SliderLongContainer>
                    <SliderLimited
                        value={properties.distance}
                        handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                        min={0} max={100} step={0.1} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {distance: 10} )} />
            </TraitSingle>

            <TraitSingle name="Angle">
                <SliderLongContainer>
                    <SliderLimited
                            value={properties.angle}
                            handleChange={(val) => updateLightProperties(id, {angle: val} )} 
                            min={0} max={1} step={0.002} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {angle: 0.6} )} />
            </TraitSingle>
                
            <TraitSingle name="Penumbra">
                <SliderLongContainer>
                    <SliderLimited
                        value={properties.penumbra}
                        handleChange={(val) => updateLightProperties(id, {penumbra: val} )} 
                        min={0} max={1} step={0.002} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateLightProperties(id, {penumbra: 0.6} )} />
            </TraitSingle>
        </>
    );
}