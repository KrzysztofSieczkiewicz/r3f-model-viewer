import React from "react";
import styles from './VisibilityButton.module.css';
import { EditableWrapper } from "../SidebarControlsContext";

type Props = {
    object: EditableWrapper,
    updateProperty: (id:string, property: keyof EditableWrapper, value:any) => void
}

export const VisibilityButton = ({object, updateProperty} :Props): JSX.Element => {
    return (
        <button
            className={object.visible ? styles.button : `${styles.button} ${styles.suppressed}`}
            onClick={(e) => {
                e.stopPropagation();
                updateProperty(object.id, 'visible', !object.visible)
            }}
        >&#128065;</button>
    );
}