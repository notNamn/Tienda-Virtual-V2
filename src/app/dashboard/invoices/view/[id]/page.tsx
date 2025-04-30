import OneInvoiceView from '@/components/dashboard/invoice/view/OneInvoiceView';
import { getInvoiceById } from '@/service/InvoiceService';
import React from 'react'

type ViewOrderInvoiceProps = {
  params: {
    id: number; 
  } 
}

export default async function pageViewOrderInvoiceById({params}: ViewOrderInvoiceProps) {
    const {id} = params;
    const invoice = await getInvoiceById(id);
  return (
    <div className='container mx-auto py-8 px-4' >
      <OneInvoiceView invoice={invoice!} />
    </div>
  )
}
