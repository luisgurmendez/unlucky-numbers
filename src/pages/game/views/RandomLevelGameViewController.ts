import GameState from "../state";
import GameViewController from "./GameViewController";

class RandomGameViewController extends GameViewController {

    render(state: GameState) {
        const root = document.getElementById('root')!;
        root.innerHTML = `
            <div id='game-container'>
                <game-board has-won="${state.hasWon()}" numbers="${state.numbers.join(',')}" selected-number-index="${state.selectedNumberIndex ?? ''}"></game-board>
                <game-sidebar operators="+,-,*,/" selected-operator="${state.selectedOperator ?? ''}"></game-sidebar>
            </div>
        `;
    }
}

export default RandomGameViewController;


