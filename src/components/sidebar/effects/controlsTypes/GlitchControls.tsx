import React from "react";

import { EFFECT_TYPES, GlitchProperties } from "../../../../models/Effect";
import { Checkbox } from "../../controls/Checkbox";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ItemTrait } from "../../commons/ItemTrait";
import { ListItemBody } from "../../commons/ListItemBody";

type Props = {
    properties: GlitchProperties,
}

export const GlitchControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.glitch;

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
            <ItemTrait name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </ItemTrait>
        </ListItemBody>
    );
}