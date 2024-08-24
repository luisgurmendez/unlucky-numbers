const ops = ['+', '-', '*', '/'];

export async function solve(digits: number[], target: number = 13) {
    const digitsStr = digits.map(d => d.toString());
    const solutions: string[] = [];
    await findExpression(digitsStr, '', target, solutions);
    console.log(solutions.length);
    if (solutions.length <= 8) {
        console.log(solutions);
    }
}


async function findExpression(digits: string[], expression: string, target: number, solutions: string[]): Promise<string | null> {

    if (digits.length === 0) {
        return null;
    }

    if (digits.length === 1) {
        if (eval(digits[0]) === target) {
            solutions.push(expression);
            return expression;
        } else {
            return null;
        }
    }

    for (let i = 0; i < digits.length; i++) {
        for (let j = 0; j < digits.length; j++) {
            if (i === j) continue;
            for (const op of ops) {
                const evalj = eval(digits[j]);
                if (op === '/' && evalj === '0') continue;
                let iExpression: string;
                if (op === '-' && evalj < 0) {
                    iExpression = `( ${digits[i]} + (${digits[j]}) )`;
                } else {
                    iExpression = `( ${digits[i]} ${op} ${digits[j]} )`;
                }
                const newDigits = [...digits];

                if (i > j) {
                    newDigits.splice(i, 1);
                    newDigits.splice(j, 1);
                } else {
                    newDigits.splice(j, 1);
                    newDigits.splice(i, 1);
                }
                newDigits.push(iExpression);
                const result = await findExpression(newDigits, iExpression, target, solutions);
                // if (result !== null) {
                //     return result;
                // }
            }
        }
    }

    return null;
}







