class Level {
  target: number = 13;

  operators: string[] = [];
  numbers: number[] = [];

  constructor(numbers: number[] = [], operators: string[] = []) {
    this.numbers = numbers;
    this.operators = operators;
  }
}
