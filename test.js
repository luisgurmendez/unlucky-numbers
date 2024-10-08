
const ops = ['+', '-', '*', '/'];

function findExpression(digits, expression, target) {

    if (digits.length === 0) {
        return null;
    }

    if (digits.length === 1) {
        if (eval(digits[0]) === target) {
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
                let iExpression
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
                const result = findExpression(newDigits, iExpression, target);
                if (result !== null) {
                    return result;
                }
            }
        }
    }

    return null;
}

console.log(findExpression([7, 2, 4, 10], '', 13));
