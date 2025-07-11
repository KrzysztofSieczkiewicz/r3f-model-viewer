import { useCallback, useLayoutEffect, useRef, useState } from "react"


export type ElementSize = {
    width: number,
    height: number,
}

export const useElementSize = <T extends HTMLElement = HTMLDivElement>(): [React.RefObject<T>, ElementSize ] => {
    const ref = useRef<T>(null);
    const [size, setSize] = useState<ElementSize>({width: 0, height: 0});

    const updateSize = useCallback(() => {
        const element = ref.current;
        if (!element) return;
        if (element.offsetWidth === 0 && element.offsetHeight === 0) return;

        setSize({
            width: element.offsetWidth,
            height: element.offsetHeight
        });
    }, [])


    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        updateSize();

        const observer = new ResizeObserver((entries) => {
            if (entries[0] && entries[0].target === element) {
                updateSize();
            }
        });
        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, [ref.current, updateSize]);

    return [ref, size];
}