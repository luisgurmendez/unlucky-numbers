import LevelController from "./pages/level/controller";
import LevelViewController from "./pages/level/view";
import { Operators } from "./utils";

(async function () {

  const game = new LevelController();
  const view = new LevelViewController();


  function addEventListenersOnNextFrame() {
    requestAnimationFrame(() => {
      const operators = document.getElementsByClassName("operator");
      Array.from(operators).forEach((e) => e.addEventListener("click", async () => {
        const operator = e.getAttribute("data-operator");
        game.selectOperator(operator as Operators);
      }));

      const cards = document.getElementsByClassName("number-card");
      Array.from(cards).forEach((e) => e.addEventListener("click", async () => {
        const cardNumber = e.getAttribute("data-number-index");
        game.selectNumber(Number(cardNumber));
      }));
    });
  }

  view.render(game.currentState);
  game.subscribe((state) => {
    view.render(state);
    addEventListenersOnNextFrame()
  });
  addEventListenersOnNextFrame();

})();
