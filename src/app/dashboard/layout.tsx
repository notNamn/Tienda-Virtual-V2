import React from 'react'
import { LayoutProps } from '../../model/proyect';
import NavBar from '@/components/ui/NavBar';

export default function layoutDashboard({children}: LayoutProps) {
  return (
    <main>
       <NavBar/> 
      {children}
    </main>
  )
}
 