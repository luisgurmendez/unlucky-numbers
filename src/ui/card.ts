interface CardOptions {
    attributes?: Record<string, string>;
    onClick?: (event: MouseEvent) => void;
    className?: string;
}

function Card(children: HTMLElement | string, opts: CardOptions = {}): HTMLDivElement {
    const card = document.createElement('div');
    card.className = `card pixelated-border ${opts.className ?? ''}`;
    if (opts.onClick) {
        card.onclick = opts.onClick;
    }

    if (opts.attributes) {
        for (const [key, value] of Object.entries(opts.attributes)) {
            card.setAttribute(key, value);
        }
    }

    const cardElement = document.createElement('div');
    cardElement.className = 'card-element';

    if (children instanceof HTMLElement) {
        cardElement.appendChild(children);
    } else {
        cardElement.innerHTML = children;
    }
    card.appendChild(cardElement);
    return card;
}

export default Card;



