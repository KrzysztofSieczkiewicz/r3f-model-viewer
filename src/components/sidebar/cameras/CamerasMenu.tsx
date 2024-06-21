import React, { useState } from "react";
import { useCamerasContext } from "../../contexts/CamerasContext";

import { CameraWrapper } from "../../../models/Camera";
import { CameraItem } from "./CameraItem";
import { AddCameraDropdown } from "./AddCameraDropdown";
import { MenuSection } from "../commons/MenuSection";
import { SidebarMenu } from "../commons/SidebarMenu";


export const CamerasMenu = () => {
    const { camerasList } = useCamerasContext();
   
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