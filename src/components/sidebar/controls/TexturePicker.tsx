import React, { useState } from "react";
import styles from './TexturePicker.module.css';

import { Texture } from "three";

type Props = {
    map?: Texture | null;
}

export const TexturePicker = ({map=null}: Props) => {

    const [ isPickerOpen, setIsPickerOpen ] = useState(false);
    const [ position, setPosition ] = useState(0);

    const toggleColorPicker = (e: React.MouseEvent<HTMLDivElement>) => {
        setPosition(e.clientX - 25);
        setIsPickerOpen(active => !active);
    }

    const handleDisplayedTitle = () => {
        if (map === null) return "Select file...";
        return map.name;
    }

    return (<>
        <div
            className={styles.previewContainer}
            onMouseDown={(e) => toggleColorPicker(e)} 
        >
            <p className={styles.mapName}>{handleDisplayedTitle()}</p>
        </div>

        {isPickerOpen &&
        <div>
            <PickerWindow />
        </div>}
    </>)
}

// TODO: CONSIDER REPLACING WITH MODAL?
const PickerWindow = () => {
    return (
    <div className={styles.pickerWindowContainer}>
        <p>Select file</p>
    </div>)
}