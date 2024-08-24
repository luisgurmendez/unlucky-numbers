
interface ButtonOptions { }

function PixelButton(text: string, onClick?: () => void, options: ButtonOptions = {}) {

    const button = document.createElement('button');
    button.classList.add('pixel-button');
    if (onClick) {
        button.onclick = onClick;
    }

    const buttonText = document.createElement('span');
    buttonText.classList.add('pixel-button-text');
    buttonText.innerHTML = text;
    button.appendChild(buttonText);

    return button;
}

export default PixelButton;