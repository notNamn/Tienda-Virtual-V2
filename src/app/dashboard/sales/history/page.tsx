import TableHistory from '@/components/dashboard/sales/history/TableHistory';
import { getHistorySales } from '@/service/HistoryService'
import React from 'react'

export default async function pageHistorySales() {
  const historiesSales = await getHistorySales();
  //console.log({historiesSales})
  return (
    <div className='mt-8' >
      <TableHistory salesHistories={historiesSales} />
    </div>
  )
}
