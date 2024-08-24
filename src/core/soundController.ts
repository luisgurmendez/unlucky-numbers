import { wait } from "@/utils";

type SoundEffect = (i: number) => number;

declare global {
    var isSoundEnabled: boolean;
}

globalThis.isSoundEnabled = true;

class SoundEffectController {

    /**
     * @nocollapse;
     */
    static pop() {
        this.playEffect((i: number) => Math.sin(i / 12) * Math.exp(-i / 300) * (i % 600 < 200 ? 1 : 0.3));
    }

    /**
     * @nocollapse;
     */
    static select() {
        this.playEffect(i => (
            // Math.sin(i * 0.07) * Math.exp(-i / 150) * (1 - i / 2500) +  // Primary short blip
            0.4 * Math.sin(i * 0.14) * Math.exp(-i / 200) * (1 - i / 3000)  // Slightly higher frequency for texture
        ));
    }

    /**
    * @nocollapse;
    */
    static unselect() {
        this.playEffect(i => Math.sin(i / 22) * Math.exp(-i / 300) * (1 - i / 3000));
    }

    /**
    * @nocollapse;
    */
    static async end() {
        this.playEffect(i => Math.sin(i / 16) * Math.exp(-i / 300) * (1 - i / 3000));
        await wait(120);
        this.playEffect(i => Math.sin(i / 28) * Math.exp(-i / 300) * (1 - i / 3000));
    }
    /**
    * @nocollapse;
    */
    static async start() {
        this.playEffect(i => Math.sin(i / 28) * Math.exp(-i / 300) * (1 - i / 3000));
        await wait(120);
        this.playEffect(i => Math.sin(i / 16) * Math.exp(-i / 300) * (1 - i / 3000));
    }

    static setGlobalSoundEnabledState(isEnabled: boolean) {
        globalThis.isSoundEnabled = isEnabled;
    }

    static getGlobalSoundEnabledState(): boolean {
        return globalThis.isSoundEnabled;
    }

    private static playEffect(effect: SoundEffect) {
        if (!globalThis.isSoundEnabled) return;
        const context = new AudioContext()
        const buffer = context.createBuffer(1, 96e3, 48e3)
        const channel = buffer.getChannelData(0)
        for (let i = 96e3; i--;)channel[i] = effect(i)
        const source = context.createBufferSource()
        source.buffer = buffer
        source.connect(context.destination)
        source.start()
    }
}

export default SoundEffectController;
