import LevelController from "../controller";
import LevelState from "../state";
import GameBoardView from "./gameBoard";
import GameBoardFooterView from "./gameBoardFooter";
import GameSidebarView from "./gameSidebar";

class LevelViewController {

    render(state: LevelState) {
        const root = document.getElementById('root')!;
        root.innerHTML = `
            <div id='game-container'>
                <game-board has-won="${state.hasWon()}" numbers="${state.numbers.join(',')}" selected-number-index="${state.selectedNumberIndex ?? ''}"></game-board>
                <game-sidebar operators="+,-,*,/" selected-operator="${state.selectedOperator ?? ''}"></game-sidebar>
            </div>
        `;
    }

    bindController(controller: LevelController) {
        Object.assign(GameBoardView.prototype, { controller });
        Object.assign(GameBoardFooterView.prototype, { controller });
        Object.assign(GameSidebarView.prototype, { controller });
    }

}

export default LevelViewController;


