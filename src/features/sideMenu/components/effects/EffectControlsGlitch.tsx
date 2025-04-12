import React from "react";

import { EFFECT_TYPES, GlitchProperties } from "../../../../models/Effect";
import { TraitSingle } from "../common/traits/TraitSingle";
import { useEffectsContext } from "../../../../components/contexts/EffectsContext";
import { Checkbox } from "../common/controls/Checkbox";

type Props = {
    properties: GlitchProperties,
}

export const EffectControlsGlitch = ( {properties}: Props ) => {
    const { updateEffectProperties } = useEffectsContext(); 

    const type = EFFECT_TYPES.glitch;

    return (
        <>
            <TraitSingle name="Active">
                <Checkbox
                    value={properties.enabled}
                    handleChange={(value) => updateEffectProperties(type, {enabled: value} )} />
            </TraitSingle>
        </>
    );
}