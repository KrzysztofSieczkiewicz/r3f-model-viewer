import React, { useState } from "react";

import { CameraWrapper } from "../../../models/Camera";
import { CameraItem } from "./CameraItem";
import { AddCameraDropdown } from "./AddCameraDropdown";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { Submenu } from "../../../features/sideMenu/components/common/submenu/Submenu";
import { SubmenuSection } from "../../../features/sideMenu/components/common/submenu/SubmenuSection";


export const CamerasMenu = () => {
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
                <AddCameraDropdown />
            </SubmenuSection>

            <SubmenuSection title="Cameras">
                {camerasList.map((camera: CameraWrapper) => {
                    return (
                        <CameraItem
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