import * as React from "react";

import { calculatorReducer, initialCalculatorState, CalculatorEvents } from "../reducers/calculatorReducer";

import { ICalculatorState } from "../models";

const keypadKeysConfig = [
    ['c', '%', 'del', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
]
const operators = ['*', '-', '+', '/', '='];
const specialOperators = ['c', '%', 'del'];

function CalculatorScreen(props: ICalculatorState) {
    return (
        <div className="mb-4 rounded p-2 bg-gray-200 text-right">
            <p>{props.expression}&nbsp;</p>
            <h2 className="text-3xl font-medium">{props.total}</h2>
        </div>
    )
}

interface CalculatorKeypadProps {
    dispatch: Function
}

function CalculatorKeypad(props: CalculatorKeypadProps) {
    const callback = React.useCallback(
        ({ currentTarget }) => {
            const { textContent } = currentTarget;
            switch (textContent) {
                case "del":
                    props.dispatch({
                        type: CalculatorEvents.deleteLastEntry
                    });
                    break;

                case "c":
                    props.dispatch({
                        type: CalculatorEvents.clearExpression
                    });
                    break;

                default:
                    props.dispatch({
                        type: CalculatorEvents.setExpression,
                        payload: textContent
                    });
            }
        },
        [props.dispatch]
    )

    return (
        <div className="flex flex-col text-2xl">
            {keypadKeysConfig.map((row) => {
                return (
                    <div key={row.join()} className="mb-2 flex">
                        {row.map(key => {
                            const key0Classname = key === '0' ? "flex-grow": "";
                            const operatorClassname = operators.includes(key) ? "bg-orange-500" : "";
                            const specialOperatorsClassName = specialOperators.includes(key) ? "bg-gray-400 text-black" : "bg-gray-700 text-white";
                            const keyClassname = `mx-1 w-20 h-20 rounded-full capitalize ${key0Classname} ${operatorClassname} ${specialOperatorsClassName}`
                            return <button onClick={callback} key={key} className={keyClassname}>{key}</button>
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default function Calculator() {
    const [calculatorState, dispatch] = React.useReducer(calculatorReducer, initialCalculatorState);

    return (
        <div>
            <span className="inline-block p-6 rounded bg-gray-900">
                <CalculatorScreen {...calculatorState} />
                <CalculatorKeypad dispatch={dispatch} />
            </span>
        </div>
    )
}