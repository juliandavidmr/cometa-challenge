export interface Order {
	id: string;
	paid: boolean;
	created: string;
	taxes: number;
	subtotal: number;
	discounts: number;
	items: OrderItem[];
	rounds: OrderRound[];
}

export interface OrderItem {
	name: string;
	quantity: number;
	total: number;
	price_per_unit: number;
	stock_id: string;
}

export interface OrderRound {
	created: string;
	items: OrderRoundItem[];
}

export interface OrderRoundItem {
	stock_id: string;
	quantity: number;
}
