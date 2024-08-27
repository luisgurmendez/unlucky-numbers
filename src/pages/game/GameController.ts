import SoundEffectController from "@/core/soundController";
import { Operators, wait } from "@/utils";
import GameState, { ShallowState } from "./GameState";
import { Level, LevelBuilder } from './LevelBuilder';
import { Expression, simplifyExpression } from "@/core/math";
import createConfettiExpltionCanvas from "./views/confetti";

class GameController {

    gameState: GameState;
    timer: number = 0;
    history: StateHistory;
    destroy?: () => void;
    levels: Level[];
    currentLevelIndex: number = 0;

    constructor(levels: Level[]) {
        this.levels = levels;
        const level = this.levels[this.currentLevelIndex];
        this.gameState = new GameState(level);
        this.history = new StateHistory(this.gameState.shallowState);
    }

    start = async () => {
        SoundEffectController.start();
        // this.gameState.setStartCountdown(3);
        // await wait(1000);
        // this.gameState.setStartCountdown(2);
        // await wait(1000);
        // this.gameState.setStartCountdown(1);
        // await wait(1000);
        // this.gameState.setHasStarted();
    }

    nextLevel = () => {
        this.currentLevelIndex++;
        if (this.currentLevelIndex < this.levels.length) {
            const level = this.levels[this.currentLevelIndex];
            this.gameState.reset(level);
            this.history = new StateHistory(this.gameState.shallowState);
        } else {
            console.log('FINISHED!');
        }

    }

    end = () => {
        this.history.reset();
        createConfettiExpltionCanvas()
        SoundEffectController.end();
    }

    selectNumber = (index: number) => {
        const state = this.gameState;
        if (this.isReadyToEvaluateExpression() && state.selectedNumberIndex !== index) {
            const expression = this.buildExpression(state.numbers[state.selectedNumberIndex!], state.numbers[index], state.selectedOperator!);
            const result = this.evaluateExpression(expression);
            const hasResultDecimals = (result - Math.floor(result)) !== 0;
            const resultNumberOrFraction = hasResultDecimals ? simplifyExpression(expression) : result;
            const numbersAfterOperation = state.numbers.slice();
            const indexToUpdate = index > state.selectedNumberIndex! ? state.selectedNumberIndex! : index;
            const indexToRemove = index > state.selectedNumberIndex! ? index : state.selectedNumberIndex!;
            numbersAfterOperation.splice(indexToUpdate, 1, resultNumberOrFraction);
            numbersAfterOperation.splice(indexToRemove, 1);
            state.setNumbers(numbersAfterOperation);
            state.deselectNumber();
            state.deselectOperator();
            this.pushStateToHistory();
            if (state.hasWon()) {
                queueMicrotask(this.end)
            } else {
                SoundEffectController.pop();
            }
        } else {
            if (state.selectedNumberIndex === index) {
                state.deselectNumber();
                state.deselectOperator();
                SoundEffectController.unselect();
            } else if (state.numbers.length > 1) {
                state.selectNumber(index);
                SoundEffectController.select();
            }
        }
    }

    hasWon = () => {
        return this.gameState.numbers.length === 1 && this.gameState.numbers[0] === 13;
    }

    private isReadyToEvaluateExpression = (): boolean => {
        return this.gameState.selectedNumberIndex !== null && this.gameState.selectedOperator !== null;
    }

    selectOperator = (operator: Operators) => {
        const state = this.gameState;
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

    undo = () => {
        const prevState = this.history.undo();
        if (prevState !== null) {
            SoundEffectController.unselect();
            this.gameState.setState(prevState);
        }
    }

    redo = () => {
        const nextState = this.history.redo();
        if (nextState !== null) {
            SoundEffectController.select();
            this.gameState.setState(nextState);
        }
    }

    private pushStateToHistory = () => {
        this.history.push(this.gameState.shallowState);
    }

    subscribe = (observer: (state: GameState) => void) => {
        this.gameState.subscribe(observer);
    }

    unsubscribe = (observer: (state: GameState) => void) => {
        this.gameState.unsubscribe(observer);
    }

    get isSolved() {
        return false;
    }

    private buildExpression = (a: Expression, b: Expression, operator: Operators): string => {
        return `( ${simplifyExpression(a)} ) ${operator} ( ${simplifyExpression(b)} )`;
    }

    private evaluateExpression = (expression: string): number => {
        const result = eval(expression);
        return result;
    }


}

export default GameController;


class StateHistory {
    private history: ShallowState[] = [];
    private index: number = 0;

    constructor(initialState: ShallowState) {
        this.history.push(initialState);
    }

    reset = () => {
        this.history = [];
        this.index = 0;
    }

    canUndo = () => {
        return this.index > 0;
    }

    canRedo = () => {
        return this.index < this.history.length - 1;
    }


    push = (state: ShallowState) => {
        this.history.splice(this.index + 1);
        this.history.push(state);
        this.index = this.history.length - 1;
    }

    undo = (): ShallowState | null => {
        if (this.canUndo()) {
            this.index--;
            return this.history[this.index];
        }
        return null;
    }

    redo = (): ShallowState | null => {
        if (this.canRedo()) {
            this.index++;
            return this.history[this.index];
        }
        return null;
    }

}