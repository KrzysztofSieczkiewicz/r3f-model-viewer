import React, { ReactNode } from "react";
import cssStyles from './Submenu.module.css';
import { useTransition, animated } from "react-spring";

type Props = {
    children: ReactNode,
    isVisible: boolean;
}

export const ListedObjectBody = ( {children, isVisible}: Props) => {

    const transition = useTransition(isVisible, {
        from: { opacity: 0, maxHeight: 0 },
        enter: { opacity: 1, maxHeight: 500 },
        leave: { opacity: 0, maxHeight: 0 },
        config: { mass: 1, tension: 80, friction: 120, duration: 300 },
    });

    return (
        <> {
            transition( (style, item) => 
                item 
                    ? <animated.div 
                        style={style}
                        className={cssStyles.listedItemBody} >
                            {children}
                    </animated.div>
                    : null
            )
        } </>
    );
}