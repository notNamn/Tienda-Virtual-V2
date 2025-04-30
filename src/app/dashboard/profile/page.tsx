import ProfileSeller from '@/components/dashboard/profile/ProfileSeller';
import { getSeller } from '@/service/SellerService'
import React from 'react'

export default async function pageProfileSeller() {
  const seller = await getSeller(); // ME MDNA NULL
  
  return (
    <div className='mt-8' >
      <ProfileSeller seller={seller!}/>
    </div>
  )
}
