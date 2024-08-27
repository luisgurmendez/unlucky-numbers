import { Operators } from "@/utils";
import { Level } from "../../LevelBuilder";

interface TutorialDecoratedLevel extends Level {
    hints: string[];
}

const levels: TutorialDecoratedLevel[] = [
    {
        numbers: [10, 3],
        target: 13,
        operators: [Operators.ADD, Operators.SUBTRACT],
        hints: ['10', '+', '3']
    },
    {
        numbers: [6, 1, 2, 3],
        target: 13,
        operators: [Operators.ADD, Operators.SUBTRACT, Operators.MULTIPLY],
        hints: ['6', '-', '1', '5', '*', '2', '10', '+', '3',]
    },
    {
        numbers: [11, 3, 6, 3],
        target: 13,
        operators: [Operators.ADD, Operators.SUBTRACT, Operators.MULTIPLY, Operators.DIVIDE],
        hints: ['11', '*', '3', '33', '+', '6', '39', '/', '3']
    }
]


class TutorialController {









}






