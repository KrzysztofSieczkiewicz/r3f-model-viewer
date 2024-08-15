import React, { useState } from "react";
import { Texture } from "three";

type Props = {
    map: Texture;
}

export const TexturePicker = ({map}: Props) => {

    const [ isPickerOpen, setIsPickerOpen ] = useState(false);
    const [ position, setPosition ] = useState(0);

    const toggleColorPicker = (e: React.MouseEvent<HTMLDivElement>) => {
        setPosition(e.clientX - 25);
        setIsPickerOpen(active => !active);
    }

    return (<>
        <div onMouseDown={(e) => toggleColorPicker(e)} >
            <p>{map.name}</p>
        </div>

        {isPickerOpen &&
        <div>
            <PickerWindow />
        </div>}
    </>)
}

// TODO: CONSIDER REPLACING WITH MODAL?
const PickerWindow = () => {
    return (<>

    </>)
}