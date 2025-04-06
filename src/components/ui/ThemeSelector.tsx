'use client'
import React from 'react'

import { useEffect, useState } from 'react'

export function ThemeSelector() {
  const [theme, setTheme] = useState('light')

  // Cambiar el tema cuando el estado cambie
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn m-1">
        Tema: {theme}
      </label>

      <ul tabIndex={0} 
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a onClick={() => setTheme('light')}>Light</a></li>
        <li><a onClick={() => setTheme('dark')}>Dark</a></li>
        <li><a onClick={() => setTheme('cupcake')}>Cupcake</a></li>
      </ul>
      
    </div>
  )
}