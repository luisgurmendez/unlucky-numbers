import { solve } from "./core/solver";
import LevelController from "./pages/level/controller";
import LevelViewController from "./pages/level/views/viewController";

(async function () {
  function nextLevel() {
    runLevel();
  }

  function runLevel() {
    const controller = new LevelController(nextLevel);
    const view = new LevelViewController();
    view.bindController(controller);
    solve(controller.currentState.numbers as number[], controller.currentState.target).then(console.log);
    view.render(controller.currentState);
    controller.subscribe(view.render);
  }

  nextLevel();
})(); 
