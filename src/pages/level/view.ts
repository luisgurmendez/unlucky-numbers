import PixelArtBuilder from "@/core/PixelArtBuilder";
import LevelController from "./controller";
import LevelState from "./state";
import undoPixelArt from "./pixel-icons/undo";
import { Operators } from "@/utils";
import { WebComponentsPropsParserHelper } from "@/core/webComponents";
import GameBoardView from "./views/gameBoard";
import GameSidebarView from "./views/gameSidebar";

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
        Object.assign(GameSidebarView.prototype, { controller });
    }

}

export default LevelViewController;

customElements.define('game-board', GameBoardView);
customElements.define('game-sidebar', GameSidebarView);

