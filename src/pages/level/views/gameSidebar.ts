import { WebComponentsPropsParserHelper } from "@/core/webComponents";
import LevelController from "../controller";
import { Operators } from "@/utils";

class GameSidebarView extends HTMLElement {

    operators: string[] = [];
    selectedOperator: string | null = null;
    controller?: LevelController;

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

    attachEventListeners() {
        const operators = document.getElementsByClassName("operator");
        Array.from(operators).forEach((e) => e.addEventListener("click", async () => {
            const operator = e.getAttribute("data-operator");
            this.controller?.selectOperator(operator as Operators);
        }));
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
        this.attachEventListeners();
    }
}


export default GameSidebarView;

customElements.define('game-sidebar', GameSidebarView);
