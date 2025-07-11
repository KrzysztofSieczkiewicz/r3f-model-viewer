import { useCallback, useLayoutEffect, useRef, useState } from "react"


type Size = {
    width: number,
    height: number,
}

export const useElementSize = <T extends HTMLElement = HTMLDivElement>(): [React.RefObject<T>, Size ] => {
    const ref = useRef<T>(null);
    const [size, setSize] = useState<Size>({width: 0, height: 0});


    const updateSize = useCallback(() => {
        if (!ref.current) return;

        setSize({
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight
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