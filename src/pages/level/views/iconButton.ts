import PixelArtBuilder from "@/core/PixelArtBuilder";
import { PixelArt } from "@/core/types";


export function IconButton(icon: PixelArt, disabled: boolean = false) {
    const iconCanvas = PixelArtBuilder.buildCanvas(icon, 3)
    const undoButton = document.createElement('button');
    undoButton.className = `pixelated-border pixelated-button ${disabled ? 'disabled' : ''}`;
    undoButton.appendChild(iconCanvas);
    return undoButton;
}