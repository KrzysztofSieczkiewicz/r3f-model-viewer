import React, { ReactNode, useState } from "react";
import styles from '../../Sidebar.module.css';

type Props = {
    name: string,
    children: ReactNode,
}

// TODO [INSTANT]: FINISH THIS COMPONENT BEFORE ADDING MULTILINE TRAITS
// TODO: MOVE STYLES FOR TRAIT CONTAINERS INTO SEPARATE MODULE?
export const ExpandableTraits = ({name, children}: Props) => {
    const [ isExpanded, setIsExpanded ] = useState(false)

    return (
        <div onClick={() => setIsExpanded(!isExpanded)}>
            
                <label className={styles.traitName}>{name}</label>
                {isExpanded &&
                <div>
                    {children}
                </div>
                }
        </div>
    );
}