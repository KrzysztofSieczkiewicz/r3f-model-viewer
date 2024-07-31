export const getElementCenter = (ref: HTMLElement): {centerX: number, centerY: number} => {
    if (!ref) {
        throw new Error('The element provided is null or undefined.');
    }
    const rect = ref.getBoundingClientRect();
    const centerX = (rect.left + rect.width/2);
    const centerY = (rect.bottom + rect.height/2);

    return { centerX, centerY};
}

export const getElementDimensions = (ref: HTMLElement): {width: number, height: number} => {
    if (!ref) {
        throw new Error('The element provided is null or undefined.');
    }
    const rect = ref.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    return { width, height}
}