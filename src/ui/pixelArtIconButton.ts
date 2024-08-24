import PixelArtBuilder from "@/core/PixelArtBuilder";
import { PixelArt } from "@/core/types";

interface PixelArtIconButtonOptions {
    disabled?: boolean;
    className?: string;
    onClick?: (event: MouseEvent) => void;
    scale?: number;
}

function PixelArtIconButton(icon: PixelArt, opts: PixelArtIconButtonOptions = {}): HTMLButtonElement {
    const iconCanvas = PixelArtBuilder.buildCanvas(icon, opts.scale ?? 3)
    const iconButton = document.createElement('button');
    iconButton.className = `pixelated-border pixelated-button ${opts.disabled ? 'disabled' : ''} ${opts.className ?? ''}`;
    iconButton.appendChild(iconCanvas);
    if (opts.onClick) {
        iconButton.onclick = opts.onClick;
    }

    return iconButton;
}

export default PixelArtIconButton;
