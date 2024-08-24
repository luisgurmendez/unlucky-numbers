import { Expression, simplifyExpression } from "@/core/math";
import { WebComponentsPropsParserHelper } from "@/core/webComponents";
import GameBoardFooterView, { Footer } from "./gameBoardFooter";
import LevelController from "../controller";


class GameBoardView extends HTMLElement {

    numbers: Expression[] = [];
    selectedNumberIndex: number | null = null;
    hasWon: boolean = false;
    controller?: LevelController;

    constructor() {
        super();
        this.setLocalAttributes();
    }

    private setLocalAttributes() {
        this.selectedNumberIndex = WebComponentsPropsParserHelper.parseNumber(this.getAttribute('selected-number-index'));
        const numbers = WebComponentsPropsParserHelper.parseArray(this.getAttribute('numbers'));
        this.hasWon = WebComponentsPropsParserHelper.parseBoolean(this.getAttribute('has-won'));
        this.numbers = numbers.map((number) => {
            const isFraction = number.includes('/');
            return isFraction ? simplifyExpression(number) : parseInt(number, 10);
        });
    }

    connectedCallback() {
        this.render();
    }

    attachEventListeners() {
        const cards = document.getElementsByClassName("number-card");
        Array.from(cards).forEach((e) => e.addEventListener("click", async () => {
            const cardNumber = e.getAttribute("data-number-index");
            this.controller?.selectNumber(Number(cardNumber));
        }));

        const undoButton = document.getElementById('undo-button');
        undoButton?.addEventListener('click', () => {
            this.controller?.undo();
        });

        const redoButton = document.getElementById('redo-button');
        redoButton?.addEventListener('click', () => {
            this.controller?.redo();
        });
    }

    attributeChangedCallback() {
        this.setLocalAttributes();
        this.render();
    }

    static get observedAttributes(): string[] {
        return ['numbers', 'selected-number-index', 'has-won'];
    }

    render() {
        const gameBoard = document.createElement('div');
        gameBoard.id = 'game-board';
        gameBoard.className = 'game-board';

        const gameBoardContent = document.createElement('div');
        gameBoardContent.id = 'game-board-content';

        if (this.hasWon) {
            const confettWrapper = document.createElement('div');
            confettWrapper.id = 'confetti-wrapper';
            const confettiCanvas = document.createElement('canvas');
            confettiCanvas.id = 'confetti-canvas';

            const positionedCard = document.createElement('div');
            positionedCard.style.position = 'absolute';
            positionedCard.style.top = '50%';
            positionedCard.style.left = '50%';
            positionedCard.style.transform = 'translate(-50%, -50%)';

            confettWrapper.appendChild(confettiCanvas);
            const card = Card(13, 0, false);
            positionedCard.appendChild(card);
            gameBoardContent.appendChild(confettWrapper);
            gameBoardContent.appendChild(positionedCard);
            gameBoard.appendChild(gameBoardContent);

            const footerTemplate = document.createElement('template');
            footerTemplate.innerHTML = `<game-board-footer is-undo-disabled="true" is-redo-disabled="true"></game-board-footer>`;
            gameBoard.appendChild(footerTemplate.content.childNodes[0]);

        } else {
            const cards = this.numbers.map((number, index) => {
                return Card(number, index, this.selectedNumberIndex === index);
            });
            cards.forEach((card) => {
                gameBoardContent.appendChild(card);
            });

            const footerTemplate = document.createElement('template');
            footerTemplate.innerHTML = `<game-board-footer is-undo-disabled="${!this.controller?.history.canUndo()}" is-redo-disabled="${!this.controller?.history.canRedo()}"></game-board-footer>`;
            gameBoard.appendChild(gameBoardContent);
            gameBoard.appendChild(footerTemplate.content.childNodes[0]);
        }

        this.innerHTML = ``;
        this.appendChild(gameBoard);
        this.attachEventListeners();
    }
}


export default GameBoardView;

customElements.define('game-board', GameBoardView);
customElements.define('game-board-footer', GameBoardFooterView);

function Card(expression: Expression, index: number, selected: boolean): HTMLDivElement {
    const card = document.createElement('div');
    card.className = `number-card card pixelated-border ${selected ? 'selected' : ''}`;
    card.setAttribute('data-number-index', index.toString());
    card.innerHTML = `
            <div class="card-element">
                ${simplifyExpression(expression)}
            </div>
        `;
    return card;
}