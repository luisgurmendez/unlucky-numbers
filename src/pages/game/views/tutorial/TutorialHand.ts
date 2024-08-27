import PixelArtBuilder from "@/core/PixelArtBuilder";
import StatefulWebComponent from "@/core/StatefulWebComponent";
import handPixelArt from "@/pixel-art/hand";
import handClickPixelArt from "@/pixel-art/hand_click";

type TutorialHandState = {
    target: HTMLElement | null;
    isClicking: boolean;
    x: number;
    y: number;
}

class TutorialHandView extends StatefulWebComponent<TutorialHandState> {

    constructor() {
        super({ target: null, isClicking: false, x: 0, y: 0 });
    }

    init(): void {
        this.render();
        setInterval(() => {
            this.state.isClicking = !this.state.isClicking;
        }, 500)
        this.updatePostion();
    }


    private updatePostion() {
        requestAnimationFrame(() => {
            this.setPosition();
            this.updatePostion();
        });
    }

    private setPosition() {
        if (this.state.target === null) return;
        const boundingClientRect = this.state.target.getBoundingClientRect();
        this.state.x = boundingClientRect.x + boundingClientRect.width / 2;
        this.state.y = boundingClientRect.y + boundingClientRect.height / 2;
    }

    setTarget(target: HTMLElement | null) {
        this.state.target = target;
    }

    render(): void {
        if (this.state.target === null) return;
        const pixelArt = this.state.isClicking ? handClickPixelArt : handPixelArt;
        const tutorialHand = PixelArtBuilder.buildCanvas(pixelArt, 3);
        const container = document.createElement('div');
        container.classList.add('tutorial-hand-container');
        container.appendChild(tutorialHand);
        container.style.top = `${this.state.y}px`;
        container.style.left = `${this.state.x}px`;

        this.innerHTML = ``;
        this.appendChild(container);
    }
}

export default TutorialHandView;