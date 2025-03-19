import { useCallback } from "react";

import { createOrder } from "../repository/order.service";

export const useCrudStocks = () => {
	const createOrderFn = useCallback(
		(...args: Parameters<typeof createOrder>) => {
			const response = createOrder(...args);

			return response;
		},
		[]
	);

	return {
		createOrderFn,
	};
};
