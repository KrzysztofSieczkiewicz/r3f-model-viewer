import React from "react";

type Props = {
    displayName: string;
    icon: JSX.Element;
    onClick: () => void;
}

export const PopupListItem = ( {displayName, icon, onClick}: Props) => {

    return (
        <li onClick={() => onClick()}>
            {icon}
            {displayName}
        </li>
    );
}