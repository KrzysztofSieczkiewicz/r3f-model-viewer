import { useContext } from 'react';
import SidebarControlsContext from '../SidebarControlsContext'

import { LightItem } from './LightItem';

export function LightsMenu() {
    const { lightsList, updateLight } = useContext(SidebarControlsContext);
   
    return (
        <div className="dropdown">
            {lightsList.map((light) => {
                return (
                    <LightItem light={light} updateLight={updateLight} key={light.id}/>
                );
            })}
        </div>
    );

    //// FIX active item handling by moving it upwards as in sidebar

}