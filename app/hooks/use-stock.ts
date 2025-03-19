import useSWR from "swr";

import { getStocks } from "../repository/stocks.repository";

export const useStocks = () => {
	const {
		data: stocks = [],
		error,
		isLoading,
		mutate: refetchStocks,
	} = useSWR("/api/stocks", getStocks);

	return {
		stocks,
		error,
		isLoading,
		refetchStocks,
	};
};
