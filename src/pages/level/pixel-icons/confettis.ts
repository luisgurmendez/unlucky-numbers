import circlePixelArt from './circle';
import rectanglePixelArt from './rectangle';
import spagettiPixelArt from './spagetti';
import spagetti1PixelArt from './spagetti1';

const confettis = [
    circlePixelArt,
    spagettiPixelArt,
    spagetti1PixelArt,
    rectanglePixelArt,
]

const confettiColors = [0xFF6347, 0xFFD700, 0xADFF2F, 0x1E90FF, 0xFF69B4, 0x7B68EE];

export const getRandomConfettiPixelArt = () => {
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const randomConfettiIndex = Math.floor(Math.random() * confettis.length);
    const confettiPixelArt = confettis[randomConfettiIndex];
    if (randomConfettiIndex !== 3) {
        confettiPixelArt[4][1] = color;
    } else {
        // rectangle has just 1 color
        confettiPixelArt[4][0] = color;
    }
    return confettiPixelArt;
}