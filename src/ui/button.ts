function css(styles: TemplateStringsArray) { }


// function Button() {
//     return (
//         <button className="pixel-button">
//             <span className="pixel-button-text">Click me</span>
//         </button>
//     )
// }

const buttonStyles = css`
    .pixel-button-text {
        display: block;
        padding: 12px 42px;
        font-size: 1.25rem;
        color: white;
        transform: translateY(-7px);
        background: black;
    }

    .pixel-button-text::before {
        content: "";
        display: block;
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: -10px;
        right: -10px;
        background: black;
        z-index: -1;
    }

    .pixel-button-text::after {
        content: "";
        display: block;
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: -6px;
        right: -6px;
        background: black;
        z-index: -1;
    }


    .pixel-button {
        background: rgb(40,40,40);
        border: none;
        padding: 0;
        cursor: pointer;
        position:relative;
    }

    .pixel-button::after{
        content: "";
        display: block;
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: -6px;
        right: -6px;
        background: rgb(40,40,40);
        z-index: -1;
    }

    .pixel-button::before{
        content: "";
        display: block;
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: -10px;
        right: -10px;
        background: rgb(40,40,40);
        z-index: -1;
    }

    .pixel-button:active .pixel-button-text {
        transform: translateY(-3px);
    }

`
