import React, { ReactNode } from "react";

type Props = {
    children?: ReactNode
}

export const SliderArrayContainer = ({children}: Props) => {
    return (
        <div style={{ width: "3.5rem", height: "0.75rem", marginRight: "0.5rem"}}>
            {children}
        </div>
    );
}