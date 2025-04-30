import { getSaleById } from '@/service/SaleService';
import React from 'react';
import OneSaleView from '@/components/dashboard/sales/view/OneSaleView';


type ViewOneOrderSaleProps = {
  params: {
    id: number;
  }
}

export default async function pageViewOneOrderSale({ params }: ViewOneOrderSaleProps) {
  const sale = await getSaleById(params.id);

  return (
    <div className="container mx-auto py-8 px-4">
        <OneSaleView sale={sale!} />
    </div>
  );
}
