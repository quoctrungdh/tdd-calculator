export default function calculate(expression: string) {
    const matched = (new RegExp("([\\d]+\\.?[\\d]*)?([-+*/][\\d]+\\.?[\\d]*)*")).exec(expression);
    if(!matched) {
        return 0;
    }

    if (/^[*+\/]/.test(expression)) {
        throw new Error("Cannot start the expression with invalid operators");
    }

    return eval(matched[0])
}