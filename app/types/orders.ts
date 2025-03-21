export interface OrderModel {
	id: string;
	paid: boolean;
	created: string;
	taxes: number;
	subtotal: number;
	discounts: number;
	items: OrderItemModel[];
	rounds: OrderRoundModel[];
}

export interface OrderItemModel {
	name: string;
	quantity: number;
	total: number;
	price_per_unit: number;
	stock_id: string;
}

export interface OrderRoundModel {
	created: string;
	items: OrderRoundItemModel[];
}

export interface OrderRoundItemModel {
	stock_id: string;
	quantity: number;
}
