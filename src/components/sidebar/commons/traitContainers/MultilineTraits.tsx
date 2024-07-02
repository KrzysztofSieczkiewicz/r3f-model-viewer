import React, { ReactNode } from "react";

type Props = {
    children: ReactNode
}

// TODO: if name is provided display it in the first column (centered)
// Then display all provided children in the second column
// Then, if provided -> display helper lines and "lock" button in the third column
export const MultilineTraits = ({children}: Props) => {

    const render = () => {
        React.Children.map(children, (child) => {
            <tr>
                <label></label>
                {child}
                <div></div>
            </tr>
        })
    }


    return (
        <></>
    );
}