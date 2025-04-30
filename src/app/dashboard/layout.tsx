import React from 'react'
import { LayoutProps } from '../../model/proyect';
import NavBar from '@/components/ui/NavBar';

export default function layoutDashboard({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <div className="p-6 mt-8">
        {children}
      </div>

    </>
  )
}
