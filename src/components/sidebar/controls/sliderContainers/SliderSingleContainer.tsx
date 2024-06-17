import React, { ReactNode } from "react";

type Props = {
    children?: ReactNode
}

export const SliderSingleContainer = ({children}: Props) => {
    return (
        <div style={{ width: "7rem", height: "1rem" }}>
            {children}
        </div>
    );
}