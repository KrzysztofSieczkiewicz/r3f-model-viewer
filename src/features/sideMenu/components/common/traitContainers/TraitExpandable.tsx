import React, { ReactNode, useState } from "react";
import styles from './TraitContainers.module.css';

type Props = {
    name: string,
    children: ReactNode,
}

export const TraitExpandable = ({name, children}: Props) => {
    const [ isExpanded, setIsExpanded ] = useState(false)

    return (
        <div className={styles.expendableMainContainer} >
            
                <div 
                    className={styles.expendableContainerName}
                    onClick={() => setIsExpanded(!isExpanded)}
                >{name}</div>

                {isExpanded && <div className={styles.expandedTraitContainer}>
                    {children}
                </div> }
        </div>
    );
}