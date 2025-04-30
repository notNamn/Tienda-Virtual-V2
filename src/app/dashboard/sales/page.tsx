import SaleAllPage from '@/components/dashboard/sales/SaleAllPage'
import { getAllProducts } from '@/service/ProductService'
import React from 'react'


export default async function pageSales() {
  const response = await getAllProducts();
  return (
    <div className="mt-8" >
      <SaleAllPage products={response} />
    </div>
  )
}
