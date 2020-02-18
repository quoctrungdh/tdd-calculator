import { calculatorReducer, CalculatorEvents } from "./calculatorReducer";

describe("calculatorReducer", () => {
    it("should return initial state correctly", () => {
        const initialState = {
            expression: "",
            total: 0
        }
        expect(calculatorReducer(undefined, { type: "" })).toEqual(initialState)
    })

    it("should handle setExpression event", () => {
        const expected = {
            expression: "5*5",
            total: 25
        }

        const state = {
            expression: "",
            total: 0
        }

        const event = {
            type: CalculatorEvents.setExpression,
            payload: "5*5"
        }
        expect(calculatorReducer(state, event)).toEqual(expected);
    })

    it("should handle clearExpression event", () => {
        const expected = {
            expression: "",
            total: 0
        }

        const state = {
            expression: "5*5",
            total: 25
        }

        const event = {
            type: CalculatorEvents.clearExpression
        }

        expect(calculatorReducer(state, event)).toEqual(expected)
    })

    it("should handle deleteLastEntry event", () => {
        const expected = {
            expression: "4*5*",
            total: 20
        }

        const state = {
            expression: "4*5*6",
            total: 120
        }

        const event = {
            type: CalculatorEvents.deleteLastEntry
        }

        expect(calculatorReducer(state, event)).toEqual(expected);
    })

    it("should handle evaluateExpression event", () => {
        const expected = {
            expression: "",
            total: 120
        }

        const state = {
            expression: "4*5*6",
            total: 120
        }

        const event = {
            type: CalculatorEvents.evaluateExpression
        }

        expect(calculatorReducer(state, event)).toEqual(expected);
    })
})