


class PageTransitionController {

    showMenu() {
        document.getElementById("cube-transition-face-front")?.classList.remove("flip");
        document.getElementById("cube-transition-face-side")?.classList.remove("flip");
    }
    showGame() {
        document.getElementById("cube-transition-face-front")?.classList.add("flip");
        document.getElementById("cube-transition-face-side")?.classList.add("flip");
    }
}


export default PageTransitionController;
