import PixelArtBuilder from "@/core/PixelArtBuilder";
import ReactiveWebComponent from "@/core/ReactiveWebComponent";
import handPixelArt from "@/pixel-art/hand";
import handClickPixelArt from "@/pixel-art/hand_click";

type TutorialHandState = {
    nextTarget: HTMLElement | null;
    isClicking: boolean;
    x: number;
    y: number;
}

class TutorialHandView extends ReactiveWebComponent<TutorialHandState> {

    constructor() {
        super({ nextTarget: null, isClicking: false, x: 0, y: 0 });
    }

    init(): void {
        setInterval(() => {
            this.state.isClicking = !this.state.isClicking;
        }, 500)
    }

    render(): void {
        const pixelArt = this.state.isClicking ? handClickPixelArt : handPixelArt;
        const tutorialHand = PixelArtBuilder.buildCanvas(pixelArt, 3);
        const container = document.createElement('div');
        container.classList.add('tutorial-hand-container');
        container.appendChild(tutorialHand);

        this.innerHTML = ``;
        this.appendChild(container);
    }
}

export default TutorialHandView;