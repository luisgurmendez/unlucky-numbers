import PixelArtBuilder from "@/core/PixelArtBuilder";
import { getRandomConfettiPixelArt } from "../pixel-icons/confettis";


function createConfettiExpltionCanvas() {
    const canvas = document.getElementById('confettiCanvas') as HTMLCanvasElement;
    const ctx = canvas!.getContext('2d');
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;


    const confettiCount = 100;
    const confettiArray: Confetti[] = [];
    const confettiColors = ["#FF6347", "#FFD700", "#ADFF2F", "#1E90FF", "#FF69B4", "#7B68EE"];

    function createConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confettiArray.push(new Confetti(canvas.width / 2, canvas.height / 2, color, ctx!));
        }
    }

    function animate() {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        confettiArray.forEach((confetti, index) => {
            confetti.update();
            confetti.draw();
            if (confetti.y > canvas.height || confetti.x < 0 || confetti.x > canvas.width) {
                confettiArray.splice(index, 1);
            }
        });
        requestAnimationFrame(animate);
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
    ctx: CanvasRenderingContext2D;
    confettiCanvas: HTMLCanvasElement;
    opacity: number;
    lifeTime: number;
    startTime: number;

    constructor(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;

        const angle = (Math.random() * Math.PI * 2);
        const speed = Math.random() * 4; // Speed for the initial burst

        this.speedX = Math.cos(angle) * (speed / 2);
        this.speedY = Math.sin(angle) * (speed / 2) - 1.4;

        this.gravity = 0.03;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (((Math.random()) + .5) * 10);
        this.confettiCanvas = PixelArtBuilder.buildCanvas(getRandomConfettiPixelArt(), 1);
        this.opacity = 1;
        this.lifeTime = 1000;
        this.startTime = Date.now();
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
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(Math.round(this.rotation * Math.PI / 180));
        this.ctx.translate(-this.confettiCanvas.width / 2, -this.confettiCanvas.height / 2);
        this.ctx.globalAlpha = this.opacity;
        this.ctx.drawImage(this.confettiCanvas, 0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        this.ctx.restore();
    }
}

export default createConfettiExpltionCanvas;
