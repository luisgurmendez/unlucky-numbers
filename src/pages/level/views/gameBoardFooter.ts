import undoPixelArt from "@/pixel-art/undo";
import redoPixelArt from "@/pixel-art/redo";
import soundPixelArt from "@/pixel-art/sound";
import soundMutePixelArt from "@/pixel-art/sound_mute";
import nextPixelArt from "@/pixel-art/next";
// import { IconButton } from "./iconButton";
import { WebComponentsPropsParserHelper } from "@/core/webComponents";
import LevelController from "../controller";
import PixelArtIconButton from "@/ui/pixelArtIconButton";
import showModal from "@/ui/modal";
import MenuModal from "./menuModal";
import SoundButton from "./soundButton";

class GameBoardFooterView extends HTMLElement {

    isUndoDisabled: boolean = false;
    isRedoDisabled: boolean = false;
    controller?: LevelController;

    constructor() {
        super();
        this.setLocalAttributes();
    }

    private setLocalAttributes() {
        this.isUndoDisabled = WebComponentsPropsParserHelper.parseBoolean(this.getAttribute('is-undo-disabled'));
        this.isRedoDisabled = WebComponentsPropsParserHelper.parseBoolean(this.getAttribute('is-redo-disabled'));
    }

    connectedCallback() {
        this.render();
    }

    attachEventListeners() {
        const undoButton = document.getElementById('undo-button');
        undoButton?.addEventListener('click', () => {
            if (this.isUndoDisabled) return;
            this.controller?.undo();
        });

        const redoButton = document.getElementById('redo-button');
        redoButton?.addEventListener('click', () => {
            if (this.isRedoDisabled) return;
            this.controller?.redo();
        });
    }

    attributeChangedCallback() {
        this.setLocalAttributes();
        this.render();
    }

    static get observedAttributes(): string[] {
        return ['is-undo-disabled', 'is-redo-disabled'];
    }

    render() {
        const footer = Footer(this.isUndoDisabled, this.isRedoDisabled, this.controller);
        this.innerHTML = ``;
        this.appendChild(footer);
        this.attachEventListeners();
    }
}

export default GameBoardFooterView;

function UndoButton(disabled: boolean) {
    const undoButton = PixelArtIconButton(undoPixelArt, { disabled });
    undoButton.id = 'undo-button';
    return undoButton;
}

function RedoButton(disabled: boolean) {
    const redoButton = PixelArtIconButton(redoPixelArt, { disabled });
    redoButton.id = 'redo-button';
    return redoButton;
}

export function Footer(isUndoDisabled: boolean, isRedoDisabled: boolean, controller?: LevelController) {
    const gameBoardFooter = document.createElement('div');
    gameBoardFooter.id = 'game-board-footer';
    const redoIcon = RedoButton(isRedoDisabled);
    const undoIcon = UndoButton(isUndoDisabled);

    const next = PixelArtIconButton(nextPixelArt, { onClick: controller?.nextLevel })

    gameBoardFooter.appendChild(next);
    gameBoardFooter.appendChild(redoIcon);
    gameBoardFooter.appendChild(undoIcon);
    const soundButton = document.createElement('sound-button');
    gameBoardFooter.appendChild(soundButton);

    return gameBoardFooter;
}

customElements.define('sound-button', SoundButton);
