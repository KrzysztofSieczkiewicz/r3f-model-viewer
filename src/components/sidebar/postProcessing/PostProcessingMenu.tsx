import { useState } from 'react';

import React from 'react';
import { useSidebarControlsContext } from '../SidebarControlsContext';


export const PostProcessingMenu = () => {
    //const { lightsList } = useSidebarControlsContext();
   
    const [activeId, setActiveItem] = useState("");

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id)
        }
    };
    
    return (
        <div className="dropdown">
            <section className="dropdown-section dropdown-item">
                <h3 className="section-header">Effects</h3>
                <>
                </>
            </section>
        </div>
    );
}