import React from "react";

import { EFFECT_TYPES, GlitchProperties } from "../../../../models/Effect";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { useEffectsContext } from "../../../contexts/EffectsContext";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ListItemBody } from "../../commons/ListItemBody";
import { TraitSingle } from "../../../../features/sideMenu/components/common/traitContainers/TraitSingle";

type Props = {
    properties: GlitchProperties,
}

export const GlitchControls = ( {properties}: Props ) => {
    const { updateEffectProperties, deleteEffect } = useEffectsContext(); 

    const type = EFFECT_TYPES.glitch;

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteEffect(type)}/>
            <TraitSingle name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </TraitSingle>
        </ListItemBody>
    );
}