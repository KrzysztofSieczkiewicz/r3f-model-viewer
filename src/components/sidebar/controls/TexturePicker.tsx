import React, { useEffect, useState } from "react";
import styles from './TexturePicker.module.css';

import { Texture, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useSafeTextureLoader } from "../../../hooks/useSafeTextureLoader";

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
            <TexturePickerPopup/>
        </div>}
    </>)
}

// TODO: ADD A FILE SELECTOR
// TODO [API]: ADD A "SEARCH THE SERVER" SELECTOR
// TODO [API]: ADD A "SEARCH FROM PROJECT FILES" SELECTOR
// TODO: ADD "LOAD FROM URL" SELECTOR
const TexturePickerPopup = () => {

    const [texture, setTexture] = useState<Texture|null>(null)
    const [imageUrl, setImageUrl] = useState<string>("");

    const loadedTexture = useSafeTextureLoader(imageUrl);
    
    useEffect(() => {
        setTexture(loadedTexture);
    }, [loadedTexture]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file)
            setImageUrl(URL.createObjectURL(file));
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