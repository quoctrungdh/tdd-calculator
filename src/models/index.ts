export interface IAction {
    type: string;
    payload?: string | number;
}

export interface ICalculatorState {
    expression: string;
    total: number
}