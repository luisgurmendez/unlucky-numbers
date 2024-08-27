import PixelButton from "@/ui/button";
import PageTransitionController from "../PageTransitionController";
import showModal from "@/ui/modal";
import TutorialGameViewController from "../game/views/TutorialGameViewController";
import instantiateGame from "@/index";
import RandomGameViewController from "../game/views/RandomLevelGameViewController";
import TutorialViewController from "../game/views/tutorial/TutorialViewController";

class GameMenuView extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const pageTransition = new PageTransitionController()
        const container = document.createElement('div');
        container.classList.add('menu-container');
        const menuContent = document.createElement('div');
        menuContent.classList.add('menu-content');
        const title = document.createElement('h1');
        title.textContent = 'Unlucky Numbers';
        title.classList.add('menu-content-title');
        menuContent.appendChild(title);

        const tutorialButton = PixelButton('Tutorial', () => {
            const viewController = new TutorialViewController();
            instantiateGame(viewController);
            pageTransition.showGame();
        });

        const settingsButton = PixelButton('Settings', () => {
            const viewController = new RandomGameViewController();
            instantiateGame(viewController);
            pageTransition.showGame();
        });
        const aboutButton = PixelButton('About', () => showModal(PixelButton('Settings', () => { })));
        const exitButton = PixelButton('Exit', () => { });
        menuContent.appendChild(tutorialButton);
        menuContent.appendChild(settingsButton);
        menuContent.appendChild(aboutButton);
        menuContent.appendChild(exitButton);

        container.appendChild(menuContent);
        this.appendChild(container);
    }
}

customElements.define('game-menu-view', GameMenuView);

export default GameMenuView;



