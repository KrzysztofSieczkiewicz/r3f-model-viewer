import React from "react";
import styles from '../Lights.module.css';

import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";

import { DeleteItemButton } from "../../common/DeleteItemButton";
import { PositionSliders } from "../../common/PositionSliders";
import { Slider } from "../../common/Slider";
import { ColorPicker } from "../../common/ColorPicker";
import { PointLightProperties } from "../../../../models/Light";

type Props = {
    id: string,
    properties: PointLightProperties,
}

export const PointLightControls = ( {id, properties}: Props ) => {
    const { updateLightProperties, deleteLight } = useSceneObjectsContext();

    return (
        <div className={styles.lightBody}>
            <span className={styles.deleteButtonContainer}>
                <DeleteItemButton deleteObject={() => deleteLight(id)}/>
            </span>
            
            <PositionSliders name="Position"
                value={properties.position} step={0.01}
                handleChange={(val) => updateLightProperties(id, {position: val} )} />
            <ColorPicker name="Color" 
                currentColor={properties.color}
                handleChange={(val) => updateLightProperties(id, {color: val} )}  />
            <Slider name="Intensity"
                value={properties.intensity}
                handleChange={(val) => updateLightProperties(id, {intensity: val} )} 
                min={0} max={3} step={0.005} defaultValue={1} />
            <Slider name="Distance"
                value={properties.distance}
                handleChange={(val) => updateLightProperties(id, {distance: val} )} 
                min={0} max={100} step={0.1} defaultValue={10} />
        </div>
    );
}