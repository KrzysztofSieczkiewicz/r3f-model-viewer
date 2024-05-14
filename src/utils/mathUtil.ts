export const roundNumber = (number: number, precision: number) => {
    const roundingFactor = Math.pow(10, precision);
    return Math.round((number + Number.EPSILON) * roundingFactor) / roundingFactor;
}

export const normalizeArrayByIndex = (numbers: number[], value: number) => {
    const normalized = numbers.map( (number) => {
        return number = number/value
    });

    return normalized;
}

export const radianToDeg = (radian: [number, number, number]): [number, number, number] => {
    return [
        radian[0] / Math.PI * 180,
        radian[1] / Math.PI * 180,
        radian[2] / Math.PI * 180,
    ]
}