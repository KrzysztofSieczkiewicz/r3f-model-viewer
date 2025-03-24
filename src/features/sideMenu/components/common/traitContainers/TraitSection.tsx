import React, { ReactNode } from "react";
import styles from './TraitContainers.module.css';

type Props = {
    name?: string;
    children: ReactNode;
}

export const TraitSection = ( {name, children}: Props) => {

    const renderDisplayName = (displayName: string|undefined) => {
        if(displayName === undefined) return;

        return <p className={styles.sectionContainerName}>{displayName}</p>
    }

    return (
        <div className={styles.sectionMainContainer}>
            {renderDisplayName(name)}
            <ul className={styles.sectionSubtraitsList}>
                {React.Children.map(children, child => {
                    return <li className={styles.sectionSubtraitContainer}>{child}</li>
                })}
            </ul>
        </div>
    );
}