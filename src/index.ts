import GameController from "./pages/game/GameController";
import { LevelBuilder } from "./pages/game/LevelBuilder";
import GameViewController from "./pages/game/views/GameViewController";
import "./pages/menu/GameMenuView";

function instantiateGame(view: GameViewController) {

  function initController(controller: GameController) {
    view.bindController(controller);
    // solve(controller.currentState.numbers as number[], controller.currentState.target).then(console.log);
    controller.start();
    view.render();
    view.update(controller.gameState);
    controller.subscribe(view.update);
  }

  const controller = new GameController([LevelBuilder.build()]);

  initController(controller);

}

export default instantiateGame;
