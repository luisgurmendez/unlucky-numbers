import PixelArtIconButton from "@/ui/pixelArtIconButton";
import soundPixelArt from "@/pixel-art/sound";
import soundMutePixelArt from "@/pixel-art/sound_mute";
import ReactiveWebComponent from "@/core/ReactiveWebComponent";
import SoundEffectController from "@/core/soundController";

type SoundState = {
    isMuted: boolean;
}

class SoundButton extends ReactiveWebComponent<SoundState> {
    constructor() {
        super({ isMuted: SoundEffectController.getGlobalSoundEnabledState() });
    }

    handleToggleSound = () => {
        const globalMuteState = SoundEffectController.getGlobalSoundEnabledState();
        SoundEffectController.setGlobalSoundEnabledState(!globalMuteState);
        this.state.isMuted = SoundEffectController.getGlobalSoundEnabledState();
        SoundEffectController.select();
    }

    render() {
        const soundButton = PixelArtIconButton(this.state.isMuted ? soundPixelArt : soundMutePixelArt,
            { onClick: this.handleToggleSound }
        );
        this.innerHTML = ``;
        this.appendChild(soundButton);
    }
}

export default SoundButton;

