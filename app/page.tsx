'use client';

import { useStocks } from "./hooks/use-stock";
import { CreateOrderForm } from "./components/create-order-form";
import { useCurrentOrders } from "./hooks/use-orders";
import { OrdersGrid } from "./components/orders-grid";

export default function Home() {
  const { stocks, isLoading, error, refetchStocks } = useStocks()
  const { orders, isLoading: isLoadingOrders, error: errorOrders, refetchOrders } = useCurrentOrders()

  if (isLoading || isLoadingOrders) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Error: {error.message}
      </div>
    )
  }

  if (errorOrders) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Error: {errorOrders.message}
      </div>
    )
  }

  return (
    <main className="p-8 grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-12 container mx-auto">
      <CreateOrderForm
        stocks={stocks}
        onCreateOrderSuccess={() => {
          refetchStocks();
          refetchOrders();
        }}
        className="lg:col-span-4 w-full"
      />
      <OrdersGrid orders={orders} className="lg:col-span-8" />
    </main>
  );
}
