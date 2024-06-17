import React from "react";
import styles from '../Effects.module.css'

import { EFFECT_TYPES, GlitchProperties } from "../../../../models/Effect";
import { Checkbox } from "../../common/Checkbox";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ItemTrait } from "../../commons/ItemTrait";

type Props = {
    properties: GlitchProperties,
}

export const GlitchControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.glitch;

    return (
        <div className={styles.effectBody}>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
            <ItemTrait name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </ItemTrait>
        </div>
    );
}