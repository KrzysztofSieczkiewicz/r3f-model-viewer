import React, { ReactNode } from "react";
import styles from './Submenu.module.css';
import { animated, config, easings, useSpring, useTransition } from "react-spring";

type Props = {
    active: boolean;
    children?: ReactNode
}

export const Submenu = ({active, children}: Props) => {

    const transition = useTransition(active, {
        from: { opacity: 0, width: '0%' },
        enter: { opacity: 1, width: '100%' },
        leave: { opacity: 0, width: '0%' },
        config: { duration: 100, easing: easings.easeInOutQuad },
    });


    return (
        <div className={styles.submenuContainer}>
            { transition( (style, item) => 
            item ? 
                <animated.div className={styles.submenu} style={style}>
                    {children}
                </animated.div>
            : null )}
        </div>
    );
}