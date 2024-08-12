import React, { ReactNode, useState } from "react";
import styles from './ExpandableTraits.module.css';

type Props = {
    name: string,
    children: ReactNode,
}

// TODO: MOVE STYLES FOR TRAIT CONTAINERS INTO SEPARATE MODULE?
export const ExpandableTraits = ({name, children}: Props) => {
    const [ isExpanded, setIsExpanded ] = useState(false)

    return (
        <div className={styles.expendableContainer} >
            
                <div 
                    className={styles.containerName}
                    onClick={() => setIsExpanded(!isExpanded)}
                >{name}</div>

                {isExpanded && <div className={styles.traitsContainer}>
                    {children}
                </div> }
        </div>
    );
}