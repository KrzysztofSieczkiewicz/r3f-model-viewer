import React, { useState } from "react";

import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";
import { SubmenuSection } from "../common/submenus/SubmenuSection";
import { CAMERA_TYPES, CameraType, CameraWrapper } from "../../../../models/Camera";
import { ListedCamera } from "./ListedCamera";
import { DropdownAddListedObject } from "../common/controls/DropdownAddListedObject";
import { Submenu } from "../common/submenus/Submenu";

type Props = {
    active: boolean;
}

export const CamerasSubmenu = ({active}: Props) => {
    const { camerasList, addCamera } = useSceneObjectsContext();
   
    const [activeId, setActiveItem] = useState("");

    const toggleItemExtension = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id)
        }
    };

    return (
        <Submenu active={active}>
            <SubmenuSection>
                <DropdownAddListedObject
                    availableOptions={Object.values(CAMERA_TYPES)}
                    onChange={(type: CameraType) => addCamera(type)} />
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