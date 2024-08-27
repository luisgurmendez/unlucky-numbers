import { randomIntegerFromInterval } from "@/core/math";
import GameState from "./GameState";
import { Operators } from "@/utils";


export class Level {
  numbers: number[];
  target: number;
  operators: Operators[];
  constructor(numbers: number[], target: number, operators: Operators[]) {
    this.numbers = numbers;
    this.target = target;
    this.operators = operators;
  }
}


export class LevelBuilder {
  static build(): Level {
    return new Level(
      [
        randomIntegerFromInterval(1, 12),
        randomIntegerFromInterval(1, 12),
        randomIntegerFromInterval(1, 12),
        randomIntegerFromInterval(1, 12)
      ],
      13,
      [Operators.ADD, Operators.SUBTRACT, Operators.MULTIPLY, Operators.DIVIDE]
    );
  }
}


