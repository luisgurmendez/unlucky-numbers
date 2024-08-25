import PixelArtBuilder from "@/core/PixelArtBuilder";
import { getRandomConfettiPixelArt } from "@/pixel-art/confettis";
import { randomNumberFromInterval } from "@/core/math";


function createConfettiExpltionCanvas() {
    let timeout = 3000;
    let startTime = performance.now();
    function getCanvas() {
        const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
        return canvas;
    }
    const canvas = getCanvas();
    canvas!.width = canvas.parentElement!.clientWidth;
    canvas!.height = canvas.parentElement!.clientHeight;

    const confettiCount = 200;
    const confettiArray: Confetti[] = [];
    const confettiColors = ["#FF6347", "#FFD700", "#ADFF2F", "#1E90FF", "#FF69B4", "#7B68EE"];

    function createConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confettiArray.push(new Confetti(canvas.width / 2, canvas.height / 2, color, getCanvas));
        }
    }

    function animate() {
        const canvas = getCanvas();
        const ctx = canvas!.getContext('2d');
        canvas!.width = canvas.parentElement!.clientWidth;
        canvas!.height = canvas.parentElement!.clientHeight;

        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        confettiArray.forEach((confetti) => {
            confetti.update();
            confetti.draw();
        });

        timeout -= performance.now() - startTime;
        startTime = performance.now();
        if (timeout > 0) {
            requestAnimationFrame(animate);
        }
    }

    createConfetti();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

class Confetti {
    x: number;
    y: number;
    color: string;
    speedX: number;
    speedY: number;
    gravity: number;
    rotation: number;
    rotationSpeed: number;
    confettiCanvas: HTMLCanvasElement;
    opacity: number;
    lifeTime: number;
    startTime: number;
    canvasGetter: () => HTMLCanvasElement;

    constructor(x: number, y: number, color: string, canvasGetter: () => HTMLCanvasElement) {
        this.x = x;
        this.y = y;
        this.color = color;

        const angle = randomNumberFromInterval(-Math.PI, Math.PI)
        const speed = Math.random() * 4; // Speed for the initial burst

        this.speedX = Math.cos(angle) * (speed);
        this.speedY = Math.sin(angle) * (speed) - 1.4;

        this.gravity = 0.03;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (((Math.random()) + .5) * 10);
        this.confettiCanvas = PixelArtBuilder.buildCanvas(getRandomConfettiPixelArt(), 1);
        this.opacity = 1;
        this.lifeTime = 2000;
        this.startTime = Date.now();
        this.canvasGetter = canvasGetter
    }

    update() {
        const timeElapsed = Date.now() - this.startTime;

        // Update position based on velocity
        this.x += this.speedX;
        this.y += this.speedY;

        // Apply gravity to the vertical speed
        this.speedY += this.gravity;

        // Rotation and fading
        this.rotation += this.rotationSpeed;
        if (timeElapsed > this.lifeTime) {
            this.opacity -= 0.02;  // Fade out over time
            if (this.opacity < 0) this.opacity = 0;
        }
    }

    draw() {
        const ctx = this.canvasGetter().getContext('2d')!;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.round(this.rotation * Math.PI / 180));
        ctx.translate(-this.confettiCanvas.width / 2, -this.confettiCanvas.height / 2);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.confettiCanvas, 0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        ctx.restore();
    }
}

export default createConfettiExpltionCanvas;
