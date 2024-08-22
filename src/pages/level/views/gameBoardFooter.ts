import PixelArtBuilder from "@/core/PixelArtBuilder";
import undoPixelArt from "../pixel-icons/undo";

export function buildUndoButton() {
    const undoIcon = PixelArtBuilder.buildCanvas(undoPixelArt, 4)
    undoIcon.id = 'undo-icon';

    const undoButton = document.createElement('button');
    undoButton.className = 'pixelated-border pixelated-button';
    undoButton.appendChild(undoIcon);
    return undoButton;
}
