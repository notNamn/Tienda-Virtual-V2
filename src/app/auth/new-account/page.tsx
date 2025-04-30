import NewAccountForm from '@/components/auth/NewAccountForm'
import React from 'react'

export default function pageNewAccount() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center mb-6 text-gray-800" >
        New Account
      </h1>
      <NewAccountForm/>
    </div>
  )
}
