import GameController from "../GameController";
import GameState from "../GameState";
import GameBoardView from "./GameBoardView";
import GameBoardFooterView from "./GameBoardFooterView";
import GameSidebarView from "./GameSidebarView";

abstract class GameViewController {

    gameContainer: HTMLElement;
    gameBoard: GameBoardView;
    gameSidebar: GameSidebarView;

    constructor() {
        this.gameContainer = document.createElement('div');
        this.gameContainer.id = 'game-container';
        this.gameBoard = new GameBoardView();
        this.gameSidebar = new GameSidebarView();
    }

    abstract render(): void;

    abstract update(state: GameState): void;

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


