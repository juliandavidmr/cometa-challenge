import { render } from '@testing-library/react'

import { AddRoundOrder } from "../add-rounds-order"


describe("Add rounds", () => {
    it("should exists a button to add round", () => {
        const { getByRole } = render(
            <AddRoundOrder
                stocks={[]}
                orderId={'123'}
                onAddedSuccess={jest.fn} />
        );

        expect(getByRole("button", { name: "Add round" })).toBeInTheDocument()
        expect(getByRole("button", { name: "Add round" })).toBeVisible()
    })
})