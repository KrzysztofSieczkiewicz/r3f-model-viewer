import React from "react";
import { BloomProperties, DepthOfFieldProperties, EFFECT_TYPES, EffectProperties, EffectWrapper, GlitchProperties } from "../../../../models/Effect";
import { TraitSection } from "../common/traits/TraitSection";
import { EffectControlsBloom } from "./EffectControlsBloom";
import { EffectControlsDepthOfField } from "./EffectControlsDepthOfField";
import { EffectControlsGlitch } from "./EffectControlsGlitch";

type Props = {
    effect: EffectWrapper
}

export const EffectControls = ({effect}: Props) => {

    const handleEffectType = (properties: EffectProperties) => {
        switch(effect.type) {
            case EFFECT_TYPES.bloom:
                return <EffectControlsBloom properties={properties as BloomProperties} />;
            case EFFECT_TYPES.depthOfField:
                return <EffectControlsDepthOfField properties={properties as DepthOfFieldProperties} />;
            case EFFECT_TYPES.glitch:
                return <EffectControlsGlitch properties={properties as GlitchProperties} />;
        }
    }
    

    return (
        <TraitSection>
            {handleEffectType(effect.properties)}
        </TraitSection>
    );
}