import { randomIntegerFromInterval } from "@/core/math";
import GameState from "./state";

export class LevelBuilder {
  static build(): GameState {
    return new GameState([
      randomIntegerFromInterval(1, 12),
      randomIntegerFromInterval(1, 12),
      randomIntegerFromInterval(1, 12),
      randomIntegerFromInterval(1, 12)
    ]);
  }
}


