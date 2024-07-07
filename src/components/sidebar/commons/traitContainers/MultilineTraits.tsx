import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from './MultilineTraits.module.css';
import { AxesLockButton } from "../../controls/buttons/AxesLockButton";

type Props = {
    displayName: string;
    children: ReactNode;
}

// TODO: if name is provided display it in the first column (centered)
// Then display all provided children in the second column
// Then, if provided -> display helper lines and "lock" button in the third column
export const MultilineTraits = ({displayName, children}: Props) => {

    const [rowHeight, setRowHeight] = useState(0);
    const [startingPointYOffset, setStartingPointOffset] = useState(0);

    const [isLocked, setIsLocked] = useState(false);

    const gridContainerRef = useRef<HTMLDivElement>(null);

    const ROWS_NUMBER = React.Children.count(children);

    useEffect(() => {
        if(!gridContainerRef.current) return;

        const calcContainerHeight = gridContainerRef.current.offsetHeight;
        const calcRowHeight = calcContainerHeight / ROWS_NUMBER;
        const calcStartingPointOffset = calcRowHeight / 2;

        setRowHeight(calcRowHeight);
        setStartingPointOffset(calcStartingPointOffset);
    }, [])

    const generateLinePath = (index: number) => {
        // Determine index distance from the middle
        const avgIndex= Math.round(ROWS_NUMBER) / 2;
        const dist = avgIndex - index - 0.5;

        // Declare line lengths
        const horizontalLineLength = 18 + Math.abs(2 * dist);
        const verticalLineHeight = dist * rowHeight;

        // Determine starting points
        const startPointX = 0;
        const startPointY = index * rowHeight + startingPointYOffset;

        return (
            <svg className={styles.svg}>
                <g>
                    <line stroke="black" strokeWidth="1" 
                        x1={startPointX} y1={startPointY}
                        x2={startPointX + horizontalLineLength} y2={startPointY} />
                    <line stroke="black" strokeWidth="1"
                        x1={startPointX + horizontalLineLength} y1={startPointY}
                        x2={startPointX + horizontalLineLength} y2={startPointY+verticalLineHeight} />
                </g>
            </svg>
        );
    }

    // TODO: ADD A VERTICAL LINE TO MARK ALL RELATED TRAITS
    return (
        <>
            <label className={styles.containerName}>{displayName}</label>
            <div ref={gridContainerRef} className={styles.gridContainer}>
                <div className={styles.column1}>
                    {React.Children.map(children, (child) => {
                        return (
                            <div>{child}</div>
                        );
                    })}
                </div>

                <div className={styles.column2}>
                    {React.Children.map(children, (child, index) => {
                        return (
                                <> {generateLinePath(index)} </>
                        ); 
                    })}
                    <div className={styles.buttonContainer}>
                        <AxesLockButton locked={isLocked} setLocked={() => setIsLocked(!isLocked)} />
                    </div>
                </div>
            </div>
        </>
    );
}