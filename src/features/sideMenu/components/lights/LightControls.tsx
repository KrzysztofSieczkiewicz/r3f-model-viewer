import React from 'react';

import { LIGHT_TYPES, LightWrapper } from '../../../../models/Light';
import { LightControlsPoint } from './LightControlsPoint';
import { LightControlsSpotlight } from './LightControlsSpotlight';
import { TraitSection } from '../common/traitContainers/TraitSection';

type Props = {
    light: LightWrapper,
}

export const LightControls = ({ light }: Props) => {

    const renderLightControls = () => {
        switch(light.type) {
            case LIGHT_TYPES.pointLight:
                return <LightControlsPoint id={light.id} properties={light.properties} />
            case LIGHT_TYPES.spotLight:
                return <LightControlsSpotlight id={light.id} properties={light.properties} />
        }
    }

    return (
        <TraitSection>
            {renderLightControls()}
        </TraitSection>
    );
}