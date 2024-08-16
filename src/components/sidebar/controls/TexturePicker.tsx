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
            <PickerWindow/>
        </div>}
    </>)
}

// TODO: ADD A FILE SELECTOR
// TODO [API]: ADD A "SEARCH THE SERVER" SELECTOR
// TODO [API]: ADD A "SEARCH FROM PROJECT FILES" SELECTOR
// TODO: ADD "LOAD FROM URL" SELECTOR
const PickerWindow = () => {

    // https://threejs.org/docs/index.html#api/en/textures/Texture
    // TODO: YOU WANT TO: 
    // 1 => GET THE FILE 
    // 2 => PROCESS IT STRAIGHT INTO PURE IMAGE (POSSIBLY EVEN A THREE.TEXTURE)
    // 3 => STORE IT LOCALLY (UNTILL "PROJECT" IS SAVED - THEN POST CHANGES TO THE BACKEND)
    // 4 => IF PROJECT IS LOADED => GET TEXTURE URL FROM THE SERVER AND AGAIN CACHE IT

    // STEPS 1,2,4 are covered by texture loader
    // https://r3f.docs.pmnd.rs/tutorials/loading-textures
    // https://stackoverflow.com/questions/43698620/applying-textures-in-three-js-using-a-url

    // TODO: REMOVE uploadUtil.ts in that case

    const renderDiskFileSelector = () => {
        return (<>
            <input type="file"
                accept=".jpg,.jpeg,.png"
            ></input>
        </>);
    }

    return (
        <div className={styles.pickerWindowContainer} >
            <span><p>Search section</p></span>
            <button>Upload from disk</button>
            <button>Provide url</button>
        </div>)
}