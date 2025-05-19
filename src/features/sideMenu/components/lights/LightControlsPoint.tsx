import React from "react";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";

import { PickerColor } from "../common/controls/PickerColor";
import { PointLightProperties } from "../../../../models/Light";
import { SliderContainerLong } from "../common/controls/SliderContainerLong";
import { ButtonReset } from "../common/controls/ButtonReset";
import { SlidersArray } from "../common/controls/SlidersArray";
import { TraitSingle } from "../common/traits/TraitSingle";
import { Slider } from "../common/controls/Slider";

type Props = {
    id: string,
    properties: PointLightProperties,
}

export const LightControlsPoint = ( {id, properties}: Props ) => {
    const { updateLightProperties } = useSceneObjectsContext();

    return (
        <>
            <TraitSingle name="Position">
                <SlidersArray
                    value={properties.position}
                    step={0.01}
                    handleChange={(val) => updateLightProperties(id, {position: val} )} />
            </TraitSingle>

            <TraitSingle name="Color">
                <PickerColor
                    currentColor={properties.color}
                    handleChange={(val) => updateLightProperties(id, {color: val} )}  />
            </TraitSingle>

            <TraitSingle name="Intensity">
                <SliderContainerLong>
                    <Slider
                        value={properties.intensity}
                        handleChange={(val) => updateLightProperties(id, {intensity: val} )} 
                        min={0} max={3} step={0.005} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateLightProperties(id, {intensity: 1} )} />
            </TraitSingle>

            <TraitSingle name="Distance">
                <SliderContainerLong>
                    <Slider 
                        value={properties.distance}
                        handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                        min={0} max={100} step={0.1} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateLightProperties(id, {distance: 10} )} />
            </TraitSingle>

            <TraitSingle name="Decay">
                <SliderContainerLong>
                    <Slider 
                        value={properties.decay}
                        handleChange={(val) => updateLightProperties(id, {decay: val} )} 
                        min={0} max={10} step={0.1} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateLightProperties(id, {decay: 0} )} />
            </TraitSingle>
        </>
    );
}