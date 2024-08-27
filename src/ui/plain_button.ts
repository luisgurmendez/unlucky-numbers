
interface PlainButtonOptions {
    attributes?: Record<string, string>;
    onClick?: (event: MouseEvent) => void;
    className?: string;
}

function PlainButton(children: HTMLElement | string, opts: PlainButtonOptions): HTMLDivElement {
    const button = document.createElement('div');
    button.className = `pixelated-border pixelated-button ${opts.className ?? ''}`;
    if (opts.onClick) {
        button.onclick = opts.onClick;
    }

    if (opts.attributes) {
        for (const [key, value] of Object.entries(opts.attributes)) {
            button.setAttribute(key, value);
        }
    }

    if (children instanceof HTMLElement) {
        button.appendChild(children);
    } else {
        button.innerHTML = children;
    }
    return button;
}

export default PlainButton;



