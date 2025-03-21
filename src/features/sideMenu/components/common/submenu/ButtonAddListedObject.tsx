import React, { ReactNode, useRef, useState } from "react";
import assetStyles from './../../common/submenu/Submenu.module.css';
import { getElementCenter, getElementDimensions } from "../../../../../utils/refUtil";
import { useSidebarModal } from "../../../../../hooks/useSidebarModal";

type Props = {
    buttonName: string,
    handleClicked: () => void,
    children: ReactNode,
}
// TODO: Should this component be joined with modal handling as : AddButtonWithModal ???
export const ButtonAddListedObject = ( {buttonName, handleClicked, children}: Props) => {

    const [modalPosition, setModalPosition ] = useState({centerX: 0, topY: 0})
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const updateButtonPosition = () => {
        if(!buttonRef.current) return;

        const currPos = getElementCenter(buttonRef.current)
        const currHeight = getElementDimensions(buttonRef.current).height;

        const centerX = currPos.centerX;
        const topY = currPos.centerY + currHeight / 2;
        
        setModalPosition({centerX, topY});
      };

    return (
        <>
            <button ref={buttonRef} className={assetStyles.addItemButton} onClick={() => handleClicked()}> {buttonName} </button>
            {children}
        </>
    );
}