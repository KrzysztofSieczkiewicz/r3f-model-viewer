import React, { ReactNode } from "react";
import styles from './TraitsSection.module.css';

type Props = {
    displayName?: string;
    children: ReactNode;
}

export const TraitsSection = ( {displayName, children}: Props) => {

    const renderDisplayName = (displayName: string|undefined) => {
        if(displayName === undefined) return;

        return <p className={styles.sectionName}>{displayName}</p>
    }

    return (
        <div className={styles.container}>
            {renderDisplayName(displayName)}
            <ul className={styles.traitsList}>
                {React.Children.map(children, child => {
                    return <li className={styles.traitContainer}>{child}</li>
                })}
            </ul>
        </div>
    );
}