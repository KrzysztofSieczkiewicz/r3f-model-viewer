import React, { ReactNode } from "react";
import styles from './TraitContainers.module.css';

type Props = {
    displayName?: string;
    children: ReactNode;
}

export const TraitSection = ( {displayName, children}: Props) => {

    const renderDisplayName = (displayName: string|undefined) => {
        if(displayName === undefined) return;

        return <p className={styles.sectionContainerName}>{displayName}</p>
    }

    return (
        <div className={styles.sectionMainContainer}>
            {renderDisplayName(displayName)}
            <ul className={styles.sectionSubtraitsList}>
                {React.Children.map(children, child => {
                    return <li className={styles.sectionSubtraitContainer}>{child}</li>
                })}
            </ul>
        </div>
    );
}