import React from "react";
import { EditableWrapper } from "../SidebarControlsContext";

type Props = {
    object: EditableWrapper,
    updateProperty: (id:string, property: keyof EditableWrapper, value:any) => void
}

export const VisibilityEyeButton = ({object, updateProperty} :Props): JSX.Element => {
    return (
        <span className={`visibility-icon header-icon ${!object.visible ? "suppressed" : ""}`} 
            onClick={(e) => {
                e.stopPropagation();
                updateProperty(object.id, 'visible', !object.visible)
            }}
        >&#128065;</span>
    );
}