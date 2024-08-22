import LevelState from "./state";

class Level {
  target: number = 13;
  state: LevelState;

  constructor(numbers: number[] = []) {
    this.state = new LevelState(numbers);
  }
}

export default Level;

const operators: string[] = ["+", "-", "*", "/"];
const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10];

export class LevelBuilder {
  static build(): Level {
    return new Level([10, 3]);
  }
}


