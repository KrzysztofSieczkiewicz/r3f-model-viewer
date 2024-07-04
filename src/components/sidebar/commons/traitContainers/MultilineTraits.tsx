import React, { ReactNode } from "react";

type Props = {
    children: ReactNode
}

// TODO: if name is provided display it in the first column (centered)
// Then display all provided children in the second column
// Then, if provided -> display helper lines and "lock" button in the third column
export const MultilineTraits = ({children}: Props) => {

    const ROW_HEIGHT = 20;
    const ROWS_NUMBER = React.Children.count(children);

    const generateLinePath = (index: number) => {
        // CALCULATE DISTANCE FROM THE MIDDLE ROW
        console.log({ROWS_NUMBER})
        let avgIndex = (ROWS_NUMBER / 2);
        if (avgIndex%2===0) {
            avgIndex= Math.round(ROWS_NUMBER / 2) /2;
        } else {
            avgIndex=  Math.round(ROWS_NUMBER / 2) /2
        }
        console.log({avgIndex})
        const dist = avgIndex - index;
        console.log({dist})

        /*
        0. 1  
        1. 2
        */

        const horizontalLineLength = 10 + 2*dist;
        const verticalLineHeight = dist * ROW_HEIGHT;

        //DRAW HORIZONTAL LINE - LONGER FOR FIRST AND LAST
        const startPointX = 0;
        const startPointY = 0;

        return (
            <svg>
                <g>
                    <line stroke="black" strokeWidth="2" 
                        x1={startPointX} y1={startPointY}
                        x2={startPointX + horizontalLineLength} y2={startPointY} />
                    <line stroke="black" strokeWidth="2"
                        x1={startPointX + horizontalLineLength} y1={startPointY}
                        x2={startPointX + horizontalLineLength} y2={startPointY+verticalLineHeight} />
                </g>
            </svg>
        );
    }

    return (
        <>
            {React.Children.map(children, (child, index) => {
                return (
                    <span>
                        {child}
                        {generateLinePath(index)}
                    </span>
                );
            }) }
        </>
    );
}