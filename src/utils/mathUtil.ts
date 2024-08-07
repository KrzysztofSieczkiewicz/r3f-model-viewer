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

export const radianToDeg = (radian: number) => {
    return radian / Math.PI * 180;
}