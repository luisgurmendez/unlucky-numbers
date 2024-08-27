import GameController from "../../GameController";
import { LevelBuilder } from "../../LevelBuilder";

class RushGameController extends GameController {
    constructor() {
        const levels = [
            LevelBuilder.build(),
            LevelBuilder.build(),
            LevelBuilder.build(),
            LevelBuilder.build(),
            LevelBuilder.build()
        ];
        super(levels);
    }
}

export default RushGameController;