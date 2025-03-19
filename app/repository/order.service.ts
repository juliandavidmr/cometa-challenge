import type { Order } from "../types/orders";

type TCreateOrderArgs = {
	taxes: number;
	discounts: number;
	rounds: Array<{
		stock_id: string;
		quantity: number;
	}>;
};

type TCreateOrderResponse = {
	success: boolean;
};

export async function createOrder(args: TCreateOrderArgs) {
	const res = await fetch("/api/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(args),
	});
	return await (res.json() as Promise<TCreateOrderResponse>);
}

export async function getCurrentOrders(url: string) {
	interface CurrentOrdersResponse {
		success: boolean;
		orders: Order[];
	}

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Failed to fetch orders");
	}
	const data = (await response.json()) as CurrentOrdersResponse;
	return data.orders || [];
}
