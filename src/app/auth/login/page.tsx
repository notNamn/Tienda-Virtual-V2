import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

export default function pageLogin() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center mb-6 text-gray-800" >
        Login
      </h1>
      <LoginForm/>
    </div>
  )
}
