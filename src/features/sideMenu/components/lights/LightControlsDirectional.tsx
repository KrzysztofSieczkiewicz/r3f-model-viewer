import React from "react";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";

import { ColorPicker } from "../common/controls/ColorPicker";
import { DirectionalLightProperties } from "../../../../models/Light";
import { SliderContainerLong } from "../common/controls/SliderContainerLong";
import { ButtonReset } from "../common/controls/ButtonReset";
import { SlidersArray } from "../common/controls/SlidersArray";
import { TraitSingle } from "../common/traits/TraitSingle";
import { Slider } from "../common/controls/Slider";
import { PickerTargetAsset } from "../common/controls/PickerTargetAsset";

type Props = {
    id: string,
    properties: DirectionalLightProperties,
}

export const LightControlsDirectional = ( {id, properties}: Props ) => {
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
                <ColorPicker
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

            <TraitSingle name="Target">
                <PickerTargetAsset value={properties.targetID} onChange={(val: string|undefined) => updateLightProperties(id, {targetID: val})}/>
            </TraitSingle>
        </>
    );

    // TODO [CURRENT] - add a new component - canvasObjectPicker
}