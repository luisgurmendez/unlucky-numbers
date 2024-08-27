import { WebComponentsPropsParserHelper } from "@/core/webComponents";
import GameController from "../GameController";
import { Operators } from "@/utils";
import Card from "@/ui/card";

class GameSidebarView extends HTMLElement {

    operators: string[] = [];
    selectedOperator: string | null = null;
    controller?: GameController;

    constructor() {
        super();
        this.setLocalAttributes();
    }

    private setLocalAttributes() {
        this.operators = WebComponentsPropsParserHelper.parseArray(this.getAttribute('operators'));
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

            const card = Card(operator, {
                className: `operator ${this.selectedOperator === operator ? 'selected' : ''}`,
                attributes: {
                    'data-operator': operator,
                },
                onClick: () => {
                    this.controller?.selectOperator(operator as Operators);
                }
            });
            return card;
        });


        this.innerHTML = ``;
        cards.forEach(card => gameSidebar.appendChild(card));
        this.appendChild(gameSidebar);
    }
}


export default GameSidebarView;

customElements.define('game-sidebar', GameSidebarView);
