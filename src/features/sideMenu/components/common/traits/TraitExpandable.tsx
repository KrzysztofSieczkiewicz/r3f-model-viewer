import React, { ReactNode, useRef, useState } from "react";
import styles from './TraitContainers.module.css';
import { useTransition, easings, animated } from "react-spring";

type Props = {
    name: string,
    expanded?: boolean,
    children: ReactNode,
}

export const TraitExpandable = ({name, expanded, children}: Props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [ isExpanded, setIsExpanded ] = useState(expanded || false)

    const transition = useTransition(isExpanded, {
        from: { opacity: 0, maxHeight: 0 },
        enter: { opacity: 1, maxHeight: 2000 },
        leave: { opacity: 0, maxHeight: 0 },
        config: { duration: 150, easing: easings.easeInOutQuad },
    });
    
    return (
        <div className={styles.expendableMainContainer} >
            
                <div 
                    className={styles.expendableContainerName}
                    onClick={() => setIsExpanded(!isExpanded)}
                >{name}</div>

                {
                    transition( (style, item) => 
                        item 
                            ? <animated.div
                                ref={contentRef}
                                style={style}
                                className={styles.expandedTraitContainer} >
                                    {children}
                            </animated.div>
                            : null
                    )
                }
        </div>
    );
}