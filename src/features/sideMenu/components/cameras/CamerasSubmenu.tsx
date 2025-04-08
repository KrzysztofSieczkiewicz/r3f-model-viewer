import React, { useState } from "react";

import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { Submenu } from "../common/submenus/Submenu";
import { SubmenuSection } from "../common/submenus/SubmenuSection";
import { DropdownAddCamera } from "./DropdownAddCamera";
import { CameraWrapper } from "../../../../models/Camera";
import { ListedCamera } from "./ListedCamera";


export const CamerasSubmenu = () => {
    const { camerasList } = useSceneObjectsContext();
   
    const [activeId, setActiveItem] = useState("");

    const toggleItemExtension = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id)
        }
    };
    
    return (
        <Submenu>
            <SubmenuSection>
                <DropdownAddCamera />
            </SubmenuSection>

            <SubmenuSection title="Cameras">
                {camerasList.map((camera: CameraWrapper) => {
                    return (
                        <ListedCamera
                            key={camera.id}
                            isActive={activeId === camera.id}
                            camera={camera}

                            toggleExtend={() => toggleItemExtension(camera.id)}
                        />
                    );
                })}
            </SubmenuSection>
        </Submenu>
    );
}