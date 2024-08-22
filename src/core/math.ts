
export type Expression = number | string;

export function isExpression(expression: Expression): expression is string {
    return typeof expression === 'string';
}


function gcd(a: number, b: number) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

export function simplifyFraction(numerator: number, denominator: number) {
    const divisor = gcd(numerator, denominator);
    numerator = numerator / divisor;
    denominator = denominator / divisor;

    // If the denominator is 1, return just the numerator
    if (denominator === 1) {
        return `${numerator}`;
    }

    // Return the fraction in the form "numerator / denominator"
    return `${numerator} / ${denominator}`;
}

export function simplifyExpression(expression: Expression): Expression {
    if (!isExpression(expression)) return expression;
    try {
        // Evaluate the full expression might throw.
        eval(expression);

        // Find the numerator and denominator
        let numerator = eval(expression.split('/')[0].trim());
        let denominator = expression.includes('/') ? eval(expression.split('/')[1].trim()) : 1;

        // Simplify the fraction
        const simplified = simplifyFraction(numerator, denominator);

        // Return the simplified fraction or whole number
        return simplified;
    } catch (e) {
        return "Invalid expression";
    }
}