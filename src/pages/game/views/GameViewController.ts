import GameController from "../GameController";
import GameState from "../state";
import GameBoardView from "./GameBoardView";
import GameBoardFooterView from "./GameBoardFooterView";
import GameSidebarView from "./GameSidebarView";

abstract class GameViewController {

    init() { }
    abstract render(state: GameState): void;

    bindController(controller: GameController) {
        Object.assign(controller, { destroy: this.destroy });

        Object.assign(GameBoardView.prototype, { controller });
        Object.assign(GameBoardFooterView.prototype, { controller });
        Object.assign(GameSidebarView.prototype, { controller });
    }

    destroy() {
        const root = document.getElementById('root')!;
        root.innerHTML = '';
    }

}

export default GameViewController;


