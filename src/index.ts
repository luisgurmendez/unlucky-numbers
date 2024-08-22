import LevelController from "./pages/level/controller";
import LevelState from "./pages/level/state";
import LevelViewController from "./pages/level/view";

(async function () {
  const controller = new LevelController();
  const view = new LevelViewController();
  view.bindController(controller);

  view.render(controller.currentState);
  controller.subscribe(view.render);

})();
