export const getElementCenter = (ref: HTMLElement): {centerX: number, centerY: number} => {
    if (!ref) {
        throw new Error('The element provided is null or undefined.');
    }
    const rect = ref.getBoundingClientRect();
    const centerX = (rect.left + rect.width/2);
    const centerY = (rect.bottom + rect.height/2);

    return { centerX, centerY};
}

export const getElementDimensions = (ref: React.RefObject<HTMLElement>): {width: number, height: number} => {
    if (!ref.current) {
        throw new Error('The element provided is null or undefined.');
    }
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    return { width, height}
}