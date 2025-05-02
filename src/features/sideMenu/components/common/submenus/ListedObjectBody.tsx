import React, { ReactNode } from "react";
import cssStyles from './Submenu.module.css';
import { useTransition, animated, useSpring, easings } from "react-spring";

type Props = {
    children: ReactNode,
    isVisible: boolean;
}

export const ListedObjectBody = ( {children, isVisible}: Props) => {

    const transition = useTransition(isVisible, {
        from: { opacity: 0, maxHeight: '0vh' },
        enter: { opacity: 1, maxHeight: '60vh' },
        leave: { opacity: 0, maxHeight: '0vh' },
        config: { duration: 250, easing: easings.easeInOutQuad },
    });

    return (
        <> {
            transition( (style, item) => 
                item 
                    ? <animated.div 
                        style={style}
                        className={cssStyles.listedObjectBody} >
                            {children}
                    </animated.div>
                    : null
            )
        } </>
    );
}