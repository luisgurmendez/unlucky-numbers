import { Expression } from "@/core/math";
import { Operators } from "@/utils";

type StateSubscription<S> = (state: S) => void;

class LevelState {
    numbers: (number | string)[] = [];
    target: number = 13;
    selectedNumberIndex: number | null = null;
    selectedOperator: Operators | null = null;
    hasStarted = false;
    startCountdown = 3;
    observers: StateSubscription<LevelState>[] = [];

    constructor(numbers: number[]) {
        this.numbers = numbers;
    }

    subscribe(observer: StateSubscription<LevelState>) {
        this.observers.push(observer);
    }

    unsubscribe(observer: StateSubscription<LevelState>) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify = debounce(this.undebouncedNotify, 10);

    undebouncedNotify() {
        this.observers.forEach(observer => observer(this));
    }

    setStartCountdown(countdown: number) {
        this.startCountdown = countdown;
        this.notify();
    }

    setHasStarted() {
        this.hasStarted = true;
        this.notify();
    }

    setNumbers(numbers: Expression[]) {
        this.numbers = numbers;
        this.notify();
    }

    selectNumber(index: number) {
        this.selectedNumberIndex = index;
        this.notify();
    }

    selectOperator(operator: Operators) {
        this.selectedOperator = operator;
        this.notify();
    }

    deselectNumber() {
        this.selectedNumberIndex = null;
        this.notify();
    }

    deselectOperator() {
        this.selectedOperator = null;
        this.notify();
    }

    hasWon() {
        return this.numbers.length === 1 && this.numbers[0] === this.target;
    }

    setState(state: ShallowState) {
        this.numbers = state.numbers;
        this.target = state.target;
        this.selectedNumberIndex = null;
        this.selectedOperator = null;
        this.hasStarted = state.hasStarted;
        this.startCountdown = state.startCountdown;
        this.notify();
    }

    get shallowState(): ShallowState {
        return {
            numbers: this.numbers,
            target: this.target,
            selectedNumberIndex: this.selectedNumberIndex,
            selectedOperator: this.selectedOperator,
            hasStarted: this.hasStarted,
            startCountdown: this.startCountdown
        };
    }

}

export default LevelState;


export interface ShallowState {
    numbers: (number | string)[];
    target: number;
    selectedNumberIndex: number | null;
    selectedOperator: Operators | null;
    hasStarted: boolean;
    startCountdown: number;
}


function debounce<T extends Function>(fn: T, delay: number): T {
    let timeout: number;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay) as unknown as number;
    } as unknown as T;
}