import React from "react";
import styles from './../Lights.module.css';
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";

import { PositionSliders } from "../../controls/PositionSliders";
import { SliderLimited } from "../../controls/SliderLimited";
import { ColorPicker } from "../../common/ColorPicker";
import { SpotLightProperties } from "../../../../models/Light";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ItemTrait } from "../../commons/ItemTrait";
import { SliderSingleContainer } from "../../controls/sliderContainers/SliderSingleContainer";

type Props = {
    id: string,
    properties: SpotLightProperties,
}

export const SpotLightControls = ( {id, properties}: Props ) => {
    const { updateLightProperties, deleteLight } = useSceneObjectsContext();

    return (
        <div className={styles.lightBody}>
            <DeleteItemButton deleteObject={() => deleteLight(id)}/>
            <ItemTrait name="Position" >
                <PositionSliders
                    value={properties.position} step={0.01}
                    handleChange={(val) => updateLightProperties(id, {position: val} )} />
            </ItemTrait>

            <ItemTrait name="Color" >
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
            </ItemTrait>

            <ItemTrait name="Distance">
                <SliderSingleContainer>
                    <SliderLimited
                        value={properties.distance}
                        handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                        min={0} max={100} step={0.1} />
                </SliderSingleContainer>
            </ItemTrait>

            <ItemTrait name="Angle">
                <SliderSingleContainer>
                    <SliderLimited
                            value={properties.angle}
                            handleChange={(val) => updateLightProperties(id, {angle: val} )} 
                            min={0} max={1} step={0.002} />
                </SliderSingleContainer>
            </ItemTrait>
                
            <ItemTrait name="Penumbra">
                <SliderSingleContainer>
                    <SliderLimited
                        value={properties.penumbra}
                        handleChange={(val) => updateLightProperties(id, {penumbra: val} )} 
                        min={0} max={1} step={0.002} />
                </SliderSingleContainer>
            </ItemTrait>
        </div>
    );
}