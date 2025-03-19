import { useCallback } from "react";

import {
	createOrder,
	removeOrder,
	updateOrder,
} from "../services/order.service";

export const useCrudOrders = () => {
	const createOrderFn = useCallback(
		(...args: Parameters<typeof createOrder>) => createOrder(...args),
		[]
	);

	const removeOrderFn = useCallback(
		(...args: Parameters<typeof removeOrder>) => removeOrder(...args),
		[]
	);

	const updateOrderFn = useCallback(
		(...args: Parameters<typeof updateOrder>) => updateOrder(...args),
		[]
	);

	return {
		createOrderFn,
		removeOrderFn,
		updateOrderFn,
	};
};
