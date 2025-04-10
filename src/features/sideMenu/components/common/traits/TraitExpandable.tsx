import React, { ReactNode, useState } from "react";
import styles from './TraitContainers.module.css';

type Props = {
    name: string,
    expanded?: boolean,
    children: ReactNode,
}

export const TraitExpandable = ({name, expanded, children}: Props) => {
    const [ isExpanded, setIsExpanded ] = useState(expanded || false)

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