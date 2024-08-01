import React, { useState } from "react";

import { CameraWrapper } from "../../../models/Camera";
import { CameraItem } from "./CameraItem";
import { AddCameraDropdown } from "./AddCameraDropdown";
import { MenuSection } from "../commons/MenuSection";
import { SidebarMenu } from "../commons/SidebarMenu";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";


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
        <SidebarMenu>
            <MenuSection>
                <AddCameraDropdown />
            </MenuSection>

            <MenuSection title="Cameras">
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
            </MenuSection>
        </SidebarMenu>
    );
}