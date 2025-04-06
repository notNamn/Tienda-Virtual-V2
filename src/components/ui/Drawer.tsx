import React from 'react'

export default function Drawer() {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Botón que abre el Drawer */}
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer" 
                    aria-label="close sidebar" 
                    className="drawer-overlay"
                > </label>

                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <h2 className='font-bold text-3xl text-center pb-4' >MENU</h2>
                    <div className="text-2xl" >
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </div>
                </ul>
            </div>
        </div>
    )
}
