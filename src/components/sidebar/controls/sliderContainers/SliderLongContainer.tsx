import React, { ReactNode } from "react";

type Props = {
    children?: ReactNode
}

export const SliderLongContainer = ({children}: Props) => {
    return (
        <div style={{ width: "7rem", height: "0.75rem" }}>
            {children}
        </div>
    );
}