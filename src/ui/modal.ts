import PixelArtBuilder from "@/core/PixelArtBuilder";
import closePixelArt from "@/pixel-art/close";

function showModal(content: HTMLElement) {

    function handleCloseModalOnEscape(ev: KeyboardEvent) {
        if (ev.key === 'Escape') {
            handleCloseModal();
        }
    }

    function handleCloseModal() {
        modal.remove();
        backdrop.remove();
        document.removeEventListener('keydown', handleCloseModalOnEscape);
    }
    const modal = Modal(content, { onClose: handleCloseModal });
    const backdrop = Backdrop();

    document.body.appendChild(modal);
    document.body.appendChild(backdrop);
    document.addEventListener('keydown', handleCloseModalOnEscape);
}

export default showModal;


interface ModalOptions {
    onClose?: () => void;
}

function Modal(children: HTMLElement, options: ModalOptions): HTMLElement {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('pixelated-border');
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const close = PixelArtBuilder.buildCanvas(closePixelArt, 3)
    close.classList.add('close-button');
    modalHeader.appendChild(close);
    if (options.onClose) {
        close.onclick = options.onClose;
    }
    modal.appendChild(modalHeader);
    const content = document.createElement('div');
    content.classList.add('modal-content');
    content.appendChild(children);
    modal.appendChild(content);

    return modal;
}


function Backdrop(): HTMLElement {
    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    return backdrop;
}



// <div class="backdrop" > </div>
//     < div class="modal pixelated-border" >
//         <div class="modal-header" > x </div>
//             < div class="modal-content" >
//                 <h2>Game Over </h2>
//                     < p > Score: <span id="score" > 0 < /span></p >
//                         <button class="pixel-button" >
//                             <span class="pixel-button-text" > Click me </span>
//                                 </button>
//                                 </div>
//                                 </div>



