import { getAllProducts } from '@/service/ProductService'
import React from 'react'
import InvoiceAllPage from '../../../components/dashboard/invoice/InvoiceAllPage';

export default async function pageInvoice() {
  const products = await getAllProducts();
  return (
    <div className='mt-8' >
      <InvoiceAllPage products={products} />
    </div>
  )
}
