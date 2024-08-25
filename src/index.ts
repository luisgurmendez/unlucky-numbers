import { solve } from "./core/solver";
import GameController from "./pages/game/GameController";
import GameViewController from "./pages/game/views/GameViewController";
import "./pages/menu/view";

function instantiateGame(view: GameViewController) {
  function nextLevel() {
    runGame();
  }

  function runGame() {
    const controller = new GameController(nextLevel);
    view.bindController(controller);
    solve(controller.currentState.numbers as number[], controller.currentState.target).then(console.log);
    view.init();
    controller.start();
    view.render(controller.currentState);
    controller.subscribe(view.render);
  }

  nextLevel();
}

export default instantiateGame;