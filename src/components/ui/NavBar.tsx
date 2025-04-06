import React from 'react'
import { ThemeSelector } from './ThemeSelector'
import Drawer from './Drawer'

export default function NavBar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                {/* <a className="btn btn-ghost normal-case text-xl">
                    Tienda Virtual
                </a> */}
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="flex-none">
                        <Drawer/>
                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">
                            Tienda Virtual
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex-none">
                <ThemeSelector />
            </div>
        </div>
    )
}
