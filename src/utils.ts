
export function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export enum Operators {
    ADD = '+',
    SUBTRACT = '-',
    MULTIPLY = '*',
    DIVIDE = '/'
}

