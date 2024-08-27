import GameState from "../../GameState";
import GameViewController from "../GameViewController";

class RandomGameViewController extends GameViewController {

    constructor() {
        super();
    }

    render = () => {
        const root = document.getElementById('root')!;
        this.gameContainer.appendChild(this.gameBoard);
        this.gameContainer.appendChild(this.gameSidebar);

        root.innerHTML = '';
        root.appendChild(this.gameContainer);
    }


    update = (state: GameState) => {

        this.gameBoard.setAttribute('has-won', state.hasWon().toString());
        this.gameBoard.setAttribute('numbers', state.numbers.join(','));
        this.gameBoard.setAttribute('selected-number-index', state.selectedNumberIndex?.toString() ?? '');

        this.gameSidebar.setAttribute('operators', '+,-,*,/');
        this.gameSidebar.setAttribute('selected-operator', state.selectedOperator ?? '');
    }
}

export default RandomGameViewController;


