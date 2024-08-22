import SoundEffectController from "@/core/soundController";
import { Operators, wait } from "@/utils";
import LevelState from "./state";
import { LevelBuilder } from './level';
import { Expression, simplifyExpression } from "@/core/math";
import createConfettiExpltionCanvas from "./views/confetti";

class LevelController {

    currentLevel;
    timer: number = 0;

    constructor() {
        this.currentLevel = LevelBuilder.build();
    }

    start = async () => {
        SoundEffectController.start();
        this.currentState.setStartCountdown(3);
        await wait(1000);
        this.currentState.setStartCountdown(2);
        await wait(1000);
        this.currentState.setStartCountdown(1);
        await wait(1000);
        this.currentState.setHasStarted();
    }

    end = () => {
        SoundEffectController.end();
    }

    selectNumber = (index: number) => {
        const state = this.currentState;
        console.log('selectNumber')
        createConfettiExpltionCanvas()
        if (this.isReadyToEvaluateExpression() && state.selectedNumberIndex !== index) {
            const expression = this.buildExpression(state.numbers[state.selectedNumberIndex!], state.numbers[index], state.selectedOperator!);
            console.log(expression);
            const result = this.evaluateExpression(expression);
            const hasResultDecimals = (result - Math.floor(result)) !== 0;
            const resultNumberOrFraction = hasResultDecimals ? expression : result;
            const numbersAfterOperation = state.numbers.slice();
            const indexToUpdate = index > state.selectedNumberIndex! ? state.selectedNumberIndex! : index;
            const indexToRemove = index > state.selectedNumberIndex! ? index : state.selectedNumberIndex!;
            numbersAfterOperation.splice(indexToUpdate, 1, resultNumberOrFraction);
            numbersAfterOperation.splice(indexToRemove, 1);
            // numbersAfterOperation[indexToUpdate] = resultNumberOrFraction;
            state.setNumbers(numbersAfterOperation);
            state.deselectNumber();
            state.deselectOperator();
            SoundEffectController.pop();
        } else {
            if (state.selectedNumberIndex === index) {
                state.deselectNumber();
                state.deselectOperator();
                SoundEffectController.select();
            } else if (state.numbers.length > 1) {
                state.selectNumber(index);
                SoundEffectController.select();
            }
        }
    }

    private isReadyToEvaluateExpression = (): boolean => {
        return this.currentState.selectedNumberIndex !== null && this.currentState.selectedOperator !== null;
    }

    selectOperator = (operator: Operators) => {
        const state = this.currentState;
        if (state.selectedNumberIndex !== null) {
            if (state.selectedOperator === operator) {
                SoundEffectController.select();
                state.deselectOperator();
            } else {
                SoundEffectController.select();
                state.selectOperator(operator);
            }
        }
    }

    undo = () => { }

    redo = () => { }

    subscribe = (observer: (state: LevelState) => void) => {
        this.currentState.subscribe(observer);
    }

    unsubscribe = (observer: (state: LevelState) => void) => {
        this.currentState.unsubscribe(observer);
    }

    get isSolved() {
        return false;
    }

    get currentState() {
        return this.currentLevel.state;
    }

    private buildExpression = (a: Expression, b: Expression, operator: Operators): string => {
        return `( ${simplifyExpression(a)} ) ${operator} ( ${simplifyExpression(b)} )`;
    }

    private evaluateExpression = (expression: string): number => {
        const result = eval(expression);
        return result;
    }


}

export default LevelController;

