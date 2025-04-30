import TableHistoryInvoice from '@/components/dashboard/invoice/history/TableHistoryInvoice'
import { getHistoryInvoices } from '@/service/HistoryService'
import React from 'react'

export default async function pageHistoryInvoice() {
  const historiesInvoices = await getHistoryInvoices();
  return (
    <div className='mt-8' >
      <TableHistoryInvoice invoices={historiesInvoices} />
    </div> 
  )
}
