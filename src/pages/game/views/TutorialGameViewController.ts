import GameState from "../GameState";
import GameViewController from "./GameViewController";
import showModal from "@/ui/modal";
import nextPixelArt from "@/pixel-art/next";
import TutorialHandView from "./tutorial/TutorialHand";
import ReactiveWebComponent from "@/core/StatefulWebComponent";
import PixelArtIconButton from "@/ui/pixelArtIconButton";
import PlainButton from "@/ui/plain_button";

const levels = [
    {
        numbers: [10, 3],
        target: 13,
        operators: ['+', '-'],
        targets: ['10', '+', '3']
    },
    {
        numbers: [6, 1, 2, 3],
        target: 13,
        operators: ['+', '-', '*'],
        targets: ['6', '-', '1', '5', '*', '2', '10', '+', '3',]
    },
    {
        numbers: [11, 3, 6, 3],
        target: 13,
        operators: ['+', '-', '*', '/'],
        targets: ['11', '*', '3', '33', '+', '6', '39', '/', '3']
    }
]


class TutorialGameViewController extends GameViewController {
    tutorialHand: TutorialHandView;
    tutorialExplanationButton: HTMLElement;

    constructor() {
        super();
        this.tutorialHand = new TutorialHandView();
        showModal(document.createElement('tutorial-modal-description'));
        this.tutorialExplanationButton = PlainButton('i', {
            onClick: () => showModal(document.createElement('tutorial-modal-description'))
        });
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
