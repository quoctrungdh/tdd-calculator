import { ICalculatorState, IAction } from "../models";
import  calculate from "../utils/calculate";

export enum CalculatorEvents {
    setExpression = "setExpression",
    clearExpression = "clearExpression",
    deleteLastEntry = "deleteLastEntry",
    evaluateExpression = "evaluateExpression"
}

export const initialCalculatorState: ICalculatorState = {
    expression: "",
    total: 0
}

export function calculatorReducer(state = initialCalculatorState, action: IAction): ICalculatorState {
    switch (action.type) {
        case CalculatorEvents.setExpression:
            const expression = action.payload as string;
            // handle complex expression
            return {
                ...state,
                expression,
                total: calculate(expression) || state.total
            }

        case CalculatorEvents.deleteLastEntry:
            let exp = state.expression;
            exp = exp.slice(0, exp.length - 1);

            return {
                ...state,
                expression: exp,
                total: calculate(exp)
            }

        case CalculatorEvents.evaluateExpression:
            return {
                ...state,
                expression: "",
                total: calculate(state.expression) || state.expression || state.total
            }

        case CalculatorEvents.clearExpression:
            return initialCalculatorState;

        default:
            return initialCalculatorState;
    }
}
