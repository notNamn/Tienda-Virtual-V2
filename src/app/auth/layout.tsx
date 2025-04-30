import { LayoutProps } from '@/model/proyect'
import React from 'react'

export default function layoutAuth({ children }: LayoutProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  )
}
