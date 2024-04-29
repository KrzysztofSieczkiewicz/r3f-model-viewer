
export const roundNumber = (number: number, precision: number) => {
    const roundingFactor = Math.pow(10, precision);
    return Math.round((number + Number.EPSILON) * roundingFactor) / roundingFactor;
}


export const normalizeArrayByIndex = (numbers: number[], index: number) => {
    const min = numbers[index];
    const normalized = numbers.map( (number) => {
        return number = number/min
    });

    return normalized;
}