import PixelArtBuilder from "@/core/PixelArtBuilder";
import LevelController from "./controller";
import LevelState from "./state";
import undoPixelArt from "./pixel-icons/undo";
import { Expression, simplifyExpression } from "@/core/math";

class LevelViewController {

    render(state: LevelState) {
        const root = document.getElementById('root')!;
        root.innerHTML = `
            <div id='game-container'>
                <game-board numbers="${state.numbers.join(',')}" selected-number-index="${state.selectedNumberIndex ?? ''}"></game-board>
                <game-sidebar operators="+,-,*,/" selected-operator="${state.selectedOperator ?? ''}"></game-sidebar>
            </div>
        `;
    }
}

export default LevelViewController;


class WebComponentsPropsParserHelper {
    static parseArray = (value: string | null): string[] => {
        if (!value) {
            return [];
        }
        return value.split(',');
    }

    static parseNumber = (value: string | null): number | null => {
        return value ? parseInt(value, 10) : null;
    }

    static parseBoolean = (value: string | null): boolean => {
        return value === 'true';
    }
}


class GameBoardView extends HTMLElement {

    numbers: Expression[] = [];
    selectedNumberIndex: number | null = null;

    constructor() {
        super();
        this.setLocalAttributes();
    }

    private setLocalAttributes() {
        this.selectedNumberIndex = WebComponentsPropsParserHelper.parseNumber(this.getAttribute('selected-number-index'));
        const numbers = WebComponentsPropsParserHelper.parseArray(this.getAttribute('numbers'));
        this.numbers = numbers.map((number) => {
            const isFraction = number.includes('/');
            return isFraction ? simplifyExpression(number) : parseInt(number, 10);
        });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.setLocalAttributes();
        this.render();
    }

    static get observedAttributes(): string[] {
        return ['numbers', 'selected-number-index'];
    }

    render() {
        const gameBoard = document.createElement('div');
        gameBoard.id = 'game-board';
        gameBoard.className = 'game-board';

        const gameBoardFooter = document.createElement('div');
        gameBoardFooter.id = 'game-board-footer';
        const undoIcon = buildUndoButton();
        gameBoardFooter.appendChild(undoIcon);

        const gameBoardContent = document.createElement('div');
        gameBoardContent.id = 'game-board-content';


        const cards = this.numbers.map((expression, index) => {
            const card = document.createElement('div');
            card.className = `number-card card pixelated-border ${this.selectedNumberIndex === index ? 'selected' : ''}`;
            card.setAttribute('data-number-index', index.toString());
            console.log(expression)
            card.innerHTML = `
                <div class="card-element">
                    ${simplifyExpression(expression)}
                </div>
            `;
            return card;
        });

        cards.forEach((card) => {
            gameBoardContent.appendChild(card);
        });

        gameBoard.appendChild(gameBoardContent);
        gameBoard.appendChild(gameBoardFooter);

        this.innerHTML = ``;
        this.appendChild(gameBoard);
    }
}


customElements.define('game-board', GameBoardView);

class GameSidebarView extends HTMLElement {

    operators: string[] = [];
    selectedOperator: string | null = null;

    constructor() {
        super();
        this.setLocalAttributes();
    }

    private setLocalAttributes() {
        const operators = WebComponentsPropsParserHelper.parseArray(this.getAttribute('operators'));
        this.operators = operators;
        this.selectedOperator = this.getAttribute('selected-operator');
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.setLocalAttributes();
        this.render();
    }

    static get observedAttributes(): string[] {
        return ['operators', 'selected-operator'];
    }

    render() {
        const gameSidebar = document.createElement('div');
        gameSidebar.id = 'game-sidebar';

        const cards = this.operators.map((operator) => {
            const card = document.createElement('div');
            card.className = `operator card pixelated-border ${this.selectedOperator === operator ? 'selected' : ''}`;
            card.setAttribute('data-operator', operator);
            card.innerHTML = `
                <div class="card-element">
                    ${operator}
                </div>
            `;
            return card;
        });

        cards.forEach((card) => {
            gameSidebar.appendChild(card);
        });

        this.innerHTML = ``;
        this.appendChild(gameSidebar);
    }
}


customElements.define('game-sidebar', GameSidebarView);

function buildUndoButton() {
    const undoIcon = PixelArtBuilder.buildCanvas(undoPixelArt, 4)
    undoIcon.id = 'undo-icon';

    const undoButton = document.createElement('button');
    undoButton.className = 'pixelated-border pixelated-button';
    undoButton.appendChild(undoIcon);
    return undoButton;
}




