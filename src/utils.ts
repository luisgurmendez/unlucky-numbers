
export function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export enum Operators {
    ADD = '+',
    SUBTRACT = '-',
    MULTIPLY = '*',
    DIVIDE = '/'
}

export function debounce<T extends Function>(fn: T, delay: number): T {
    let timeout: number;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay) as unknown as number;
    } as unknown as T;
}