import React, { useEffect, useState } from "react";
import styles from './TexturePicker.module.css';

import { Texture } from "three";
import { useSafeTextureLoader } from "../../../hooks/useSafeTextureLoader";

type Props = {
    map: Texture|null;
    handleChange: (newMap: Texture|null) => void
}

export const TexturePicker = ({map=null, handleChange}: Props) => {

    const [ isPickerOpen, setIsPickerOpen ] = useState(false);
    const [ popupPosition, setPosition ] = useState(0);

    const togglePicker = (e: React.MouseEvent<HTMLDivElement>) => {
        setPosition(e.clientX - 25);
        setIsPickerOpen(active => !active);
    }

    const handleDisplayedTitle = () => {
        if (map === null) return "Select file...";
        return map.name;
    }

    const handleTextureChange = (newTexture: Texture|null) => {
        handleChange(newTexture);
        setIsPickerOpen(false);
    }

    return (<>
        <div
            className={styles.previewContainer}
            onMouseDown={(e) => togglePicker(e)} 
        >
            <p className={styles.mapName}>{handleDisplayedTitle()}</p>
        </div>

        {isPickerOpen &&
        <div>
            <TexturePickerPopup handleChange={handleTextureChange}/>
        </div>}
    </>)
}

// TODO: ADD A FILE SELECTOR
// TODO [API]: ADD A "SEARCH THE SERVER" SELECTOR
// TODO [API]: ADD A "SEARCH FROM PROJECT FILES" SELECTOR
// TODO: ADD "LOAD FROM URL" SELECTOR
type TexturePickerPopupProps = {
    handleChange: (newTexture: Texture|null) => void
}

const TexturePickerPopup = ( {handleChange}: TexturePickerPopupProps) => {

    const [imageUrl, setImageUrl] = useState("");
    const [textureName, setTextureName] = useState("");

    const loadedTexture = useSafeTextureLoader(imageUrl);
    
    useEffect(() => {
        if(!loadedTexture) return;
        loadedTexture.name = textureName; // TODO: MAYBE INSTEAD OF SETTING NAME JUST PASS IT TO THE PARENT AS "FILE NAME?"
        handleChange(loadedTexture);
    }, [loadedTexture]);

    // TODO: introduce proper caching or at least handle releasing url after you're done
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUrl(URL.createObjectURL(file));
            setTextureName(file.name);
        }
    }

    const renderDiskFileSelector = () => {
        return (
            <input type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e)}
            />
        );
    }

    return (
        <div className={styles.pickerWindowContainer} >
            {renderDiskFileSelector()}
            <span><p>Search section</p></span>
            <button>Upload from disk</button>
            <button>Provide url</button>
        </div>)
}