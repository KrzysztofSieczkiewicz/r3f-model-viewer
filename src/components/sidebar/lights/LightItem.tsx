import React from 'react';
import styles from './Lights.module.css';

import { LIGHT_TYPES, LightWrapper } from '../../../models/Light';
import { PointLightControls } from './controlsTypes/PointLightControls';
import { SpotLightControls } from './controlsTypes/SpotLightControls';
import { DeleteItemButton } from '../common/DeleteItemButton';
import { useSceneObjectsContext } from '../../contexts/SceneObjectsContext';
import { LightItemHeader } from './LightItemHeader';

type Props = {
    isActive: boolean,
    light: LightWrapper,

    toggleExtend: () => void,
}

export const LightItem = ({ isActive, light, toggleExtend }: Props) => {
    const { deleteLight } = useSceneObjectsContext();

    const renderLightHeader = () => {
        return <LightItemHeader isActive={isActive} light={light} toggleExtend={() => toggleExtend()} />
    }

    const renderLightControls = () => {
        switch(light.type) {
            case LIGHT_TYPES.pointLight:
                return <PointLightControls id={light.id} properties={light.properties} />
            case LIGHT_TYPES.spotLight:
                return <SpotLightControls id={light.id} properties={light.properties} />
        }
    }

    return (
        <div className={isActive ? `${styles.lightContainer} ${styles.active}` : styles.lightContainer}>
            
            {renderLightHeader()}

            {isActive &&
            <div className={styles.lightBody}>
                <DeleteItemButton deleteObject={() => deleteLight(light.id)}/>
                {renderLightControls()}
            </div>
            }
        </div>
    );
}