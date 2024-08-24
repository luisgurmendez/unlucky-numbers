import PixelButton from "@/ui/button";

function MenuModal(): HTMLElement {
    const menu = document.createElement('div');
    menu.classList.add('menu-content');
    const title = document.createElement('h2');
    title.innerHTML = `MENU`;

    const actions = document.createElement('div');
    actions.classList.add('menu-actions');

    const restart = PixelButton('Restart')
    const quit = PixelButton('Quit')

    actions.appendChild(restart);
    actions.appendChild(quit);

    menu.appendChild(title);
    menu.appendChild(actions);
    return menu;
}

export default MenuModal;
