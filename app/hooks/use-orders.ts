import useSWR from "swr";

import { getCurrentOrders } from "../repository/order.service";

export const useCurrentOrders = () => {
	const {
		data: orders = [],
		error,
		isLoading,
		isValidating,
		mutate: refetchOrders,
	} = useSWR("/api/orders", getCurrentOrders, { revalidateOnFocus: true });

	return {
		orders,
		error,
		isLoading,
		isValidating,
		refetchOrders,
	};
};
