import { render } from '@testing-library/react'

import { CreateOrderForm } from '../create-order-form';


describe("Create Order", () => {
    it("should exists a button to add round", () => {
        const { getByRole } = render(
            <CreateOrderForm
                stocks={[]}
                onCreateOrderSuccess={jest.fn}
            />
        );

        expect(getByRole("heading", { name: "Create order", level: 1 })).toBeInTheDocument()
        expect(getByRole("grid")).toBeInTheDocument()
        expect(getByRole("combobox", { name: "Beers stock" })).toBeInTheDocument()
        expect(getByRole("spinbutton", { name: "Discount % Discount %" })).toBeInTheDocument()
        expect(getByRole("button", { name: "Add beer to order" })).toBeInTheDocument()
    })
})