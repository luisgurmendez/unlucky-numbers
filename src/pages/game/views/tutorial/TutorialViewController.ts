import GameViewController from "../GameViewController";
import showModal from "@/ui/modal";
import nextPixelArt from "@/pixel-art/next";
import TutorialHandView from "./TutorialHand";
import ReactiveWebComponent from "@/core/StatefulWebComponent";
import PixelArtIconButton from "@/ui/pixelArtIconButton";
import PlainButton from "@/ui/plain_button";
import GameState from "../../GameState";
import TutorialGameController from "./TutorialGameController";
import { isOperator, Operators } from "@/utils";


type Hint = string | Operators | typeof UndoSymbol;
const UndoSymbol = Symbol('Undo');

class TutorialGameViewController extends GameViewController {
    tutorialHand: TutorialHandView;
    tutorialExplanationButton: HTMLElement;
    header: HTMLElement;
    // controller: TutorialGameController;

    constructor() {
        super();
        this.tutorialHand = new TutorialHandView();
        console.log(this.tutorialHand);
        this.tutorialExplanationButton = PlainButton('i', {
            onClick: () => showModal(document.createElement('tutorial-modal-description'))
        });
        this.header = document.createElement('div');
        this.header.id = 'game-board-header';
        this.header.slot = 'game-board-header-slot';
        // this.controller = controller;
    }


    setHint = (hint: Hint | null) => {
        if (hint === UndoSymbol) {
            const undoButton = document.querySelector<HTMLElement>('#undo-button')!;
            this.tutorialHand.setTarget(undoButton);
        } else if (hint === null) {
            this.tutorialHand.setTarget(null)
        } else {
            if (isOperator(hint)) {
                const operator = document.querySelector<HTMLElement>(`.card [data-operator="${hint}"]`)!;
                this.tutorialHand.setTarget(operator);
            } else {
                const firstCard = document.querySelector(`.number-card [data-number="${hint}"]`);
                this.tutorialHand.setTarget(firstCard as HTMLElement);
            }

        }
    }

    update = (state: GameState) => {
        this.gameBoard.setAttribute('has-won', state.hasWon().toString());
        this.gameBoard.setAttribute('numbers', state.numbers.join(','));
        this.gameBoard.setAttribute('selected-number-index', state.selectedNumberIndex?.toString() ?? '');

        this.gameSidebar.setAttribute('operators', '+,-');
        this.gameSidebar.setAttribute('selected-operator', state.selectedOperator ?? '');

        queueMicrotask(() => {
            const firstCard = document.querySelector('.number-card')!;
            this.tutorialHand.setTarget(firstCard as HTMLElement);
        });
    }

    render = () => {
        const root = document.getElementById('root')!;
        this.header.appendChild(this.tutorialExplanationButton);
        // this.gameContainer.appendChild(this.header);
        this.gameContainer.appendChild(this.gameBoard);

        this.gameContainer.appendChild(this.tutorialHand);
        this.gameContainer.appendChild(this.gameSidebar);

        root.innerHTML = '';
        root.appendChild(this.gameContainer);
    }

}

export default TutorialGameViewController;

customElements.define('tutorial-hand', TutorialHandView);

function TutorialDescriptionContentStep1() {
    return `
            <span>
                step 1.
            </span>
    `
}

function TutorialDescriptionContentStep2() {
    return `
            <span>
                step 2.
            </span>
    `
}

function TutorialDescriptionContentStep3() {
    return `
            <span>
                step 3.
            </span>
    `
}

function TutorialDescriptionContentStep4() {
    return `
            <span>
                step 4.
            </span>
    `
}

function TutorialDescriptionContentStep5() {
    return `
            <span>
                step 5.
            </span>
    `
}

const steps = [
    TutorialDescriptionContentStep1,
    TutorialDescriptionContentStep2,
    TutorialDescriptionContentStep3,
    TutorialDescriptionContentStep4,
    TutorialDescriptionContentStep5,
]

type TutorialDescriptionState = {
    step: number;
}

class TutorialDescriptionView extends ReactiveWebComponent<TutorialDescriptionState> {
    constructor() {
        super({ step: 0 });
    }

    render = (): void => {
        const container = document.createElement('div');
        container.id = 'tutorial-description';

        const howToPlay = document.createElement('h2');
        howToPlay.innerText = 'How to Play';

        const content = document.createElement('div');
        content.classList.add('tutorial-description-content');
        content.innerHTML = steps[this.state.step]();

        container.appendChild(howToPlay);
        container.appendChild(content);

        // const prevButton = PixelArtIconButton(nextPixelArt, { onClick: () => this.state.step-- });
        const nextButton = PixelArtIconButton(nextPixelArt, { onClick: () => this.state.step++ });

        if (this.state.step < steps.length - 1) {
            container.appendChild(nextButton);
        }

        this.innerHTML = '';
        this.appendChild(container);
    }
}

customElements.define('tutorial-modal-description', TutorialDescriptionView);
