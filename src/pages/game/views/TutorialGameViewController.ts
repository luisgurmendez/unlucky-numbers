import GameController from "../GameController";
import GameState from "../state";
import GameBoardView from "./GameBoardView";
import GameBoardFooterView from "./GameBoardFooterView";
import GameSidebarView from "./GameSidebarView";
import GameViewController from "./GameViewController";
import showModal from "@/ui/modal";
import TutorialHandView from "./tutorial/TutorialHand";

class TutorialGameViewController extends GameViewController {

    init() {
        const tutorialContent = TutorialDescription();
        const container = document.createElement('div');
        container.innerHTML = tutorialContent;
        setTimeout(() => {
            showModal(container);
        }, 2000);
    }

    render(state: GameState) {
        const root = document.getElementById('root')!;
        const gameContainer = document.getElementById('game-container');

        root.innerHTML = `
            <div id='game-container'>
                <game-board has-won="${state.hasWon()}" numbers="${state.numbers.join(',')}" selected-number-index="${state.selectedNumberIndex ?? ''}"></game-board>
                <tutorial-hand></tutorial-hand>
                <game-sidebar operators="+,-,*,/" selected-operator="${state.selectedOperator ?? ''}"></game-sidebar>
            </div>
        `;

        const tutorial = document.createElement('div');
        tutorial.id = 'tutorial';
        document.getElementsByTagName('game-board')[0].appendChild(tutorial);
    }

}

export default TutorialGameViewController;

customElements.define('tutorial-hand', TutorialHandView);

function TutorialDescription() {
    return `
        <div id='tutorial'>
            <h2>How to Play</h2>
            <span>
                Find a combination of numbers that equals the target number.
            </span>
        </div>
    `
}






