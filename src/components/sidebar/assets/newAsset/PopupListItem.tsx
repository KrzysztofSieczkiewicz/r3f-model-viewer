import React from "react";

type Props = {
    displayName: string;
    icon: JSX.Element;
}

export const PopupListItem = ( {displayName, icon}: Props) => {

    return (
        <li>
            {icon}
            {displayName}
        </li>
    );
}