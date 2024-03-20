import React from "react";
import { LightWrapper } from "../../models/Light"

import { ReactComponent as SpotlightIcon } from '../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../icons/lightTypes/pointLight.svg';

type Props = {
    light: LightWrapper
}

export const LightTypeIcon = ( {light} :Props ) => {
    return(
    <>
        {light.type === 'pointLight' && <PointLightIcon className='type-icon header-icon' />}
        {light.type === 'spotLight' && <SpotlightIcon className='type-icon header-icon'  />}
    </>
    );
}