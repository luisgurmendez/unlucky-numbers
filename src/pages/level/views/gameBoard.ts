import PixelArtBuilder from "@/core/PixelArtBuilder";
import { Expression, simplifyExpression } from "@/core/math";
import { WebComponentsPropsParserHelper } from "@/core/webComponents";
import { buildUndoButton } from "./gameBoardFooter";
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
    }

    attributeChangedCallback() {
        this.setLocalAttributes();
        this.render();
        console.log(this.controller)
    }

    static get observedAttributes(): string[] {
        return ['numbers', 'selected-number-index', 'has-won'];
    }


    private buildCard = (expression: Expression, index: number): HTMLDivElement => {
        const card = document.createElement('div');
        card.className = `number-card card pixelated-border ${this.selectedNumberIndex === index ? 'selected' : ''}`;
        card.setAttribute('data-number-index', index.toString());
        card.innerHTML = `
                <div class="card-element">
                    ${simplifyExpression(expression)}
                </div>
            `;
        return card;
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
            const card = this.buildCard('13', 0);
            positionedCard.appendChild(card);
            gameBoardContent.appendChild(confettWrapper);
            gameBoardContent.appendChild(positionedCard);
            gameBoard.appendChild(gameBoardContent);

            const gameBoardFooter = document.createElement('div');
            gameBoardFooter.id = 'game-board-footer';
            const undoIcon = buildUndoButton();
            gameBoardFooter.appendChild(undoIcon);
            gameBoard.appendChild(gameBoardFooter);

        } else {
            const gameBoardFooter = document.createElement('div');
            gameBoardFooter.id = 'game-board-footer';
            const undoIcon = buildUndoButton();
            gameBoardFooter.appendChild(undoIcon);

            const cards = this.numbers.map(this.buildCard);

            cards.forEach((card) => {
                gameBoardContent.appendChild(card);
            });

            gameBoard.appendChild(gameBoardContent);
            gameBoard.appendChild(gameBoardFooter);
        }

        this.innerHTML = ``;
        this.appendChild(gameBoard);
        this.attachEventListeners();
    }
}


export default GameBoardView;