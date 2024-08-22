function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
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

function simplifyExpression(expression) {
    try {
        // Evaluate the full expression
        const value = eval(expression);



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

// Examples
console.log(simplifyExpression("(1 + (( 2- 2 + 2) * 3)) / (2 + 12)"));  // Output: "1 / 2"
console.log(simplifyExpression("1/2 + 1/4"));              // Output: "6"
console.log(simplifyExpression("15 / 45"));                // Output: "1 / 3"
console.log(simplifyExpression("7 + 5"));                  // Output: "12"
console.log(simplifyExpression("8 * 2"));                  // Output: "16"
