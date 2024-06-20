import React from "react";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";

import { PositionSliders } from "../../controls/PositionSliders";
import { SliderLimited } from "../../controls/SliderLimited";
import { ColorPicker } from "../../controls/ColorPicker";
import { PointLightProperties } from "../../../../models/Light";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ItemTrait } from "../../commons/ItemTrait";
import { SliderSingleContainer } from "../../controls/sliderContainers/SliderSingleContainer";
import { ListItemBody } from "../../commons/ListItemBody";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { SliderArrayContainer } from "../../controls/sliderContainers/SliderArrayContainer";

type Props = {
    id: string,
    properties: PointLightProperties,
}

export const PointLightControls = ( {id, properties}: Props ) => {
    const { updateLightProperties, deleteLight } = useSceneObjectsContext();

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteLight(id)} />

            <ItemTrait name="Position">
                <PositionSliders
                    value={properties.position} step={0.01}
                    handleChange={(val) => updateLightProperties(id, {position: val} )} />
            </ItemTrait>

            <ItemTrait name="Color">
                <ColorPicker
                    currentColor={properties.color}
                    handleChange={(val) => updateLightProperties(id, {color: val} )}  />
            </ItemTrait>

            <ItemTrait name="Intensity">
                <SliderSingleContainer>
                    <SliderLimited 
                        value={properties.intensity}
                        handleChange={(val) => updateLightProperties(id, {intensity: val} )} 
                        min={0} max={3} step={0.005} />
                </SliderSingleContainer>
                <ResetButton onReset={() => updateLightProperties(id, {intensity: 1} )} />
            </ItemTrait>

            <ItemTrait name="Distance">
                <SliderSingleContainer>
                    <SliderLimited 
                        value={properties.distance}
                        handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                        min={0} max={100} step={0.1} />
                </SliderSingleContainer>
                <ResetButton onReset={() => updateLightProperties(id, {distance: 10} )} />
            </ItemTrait>
        </ListItemBody>
    );
}