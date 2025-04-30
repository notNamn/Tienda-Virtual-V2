import { URL_INVOICE, URL_INVOICE_HISTORY, URL_PRODUCT, URL_PROFILE, URL_SALE, URL_SALE_HISTORY } from '@/model/proyect'
import Link from 'next/link'
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
                        <li>
                            <Link href={URL_PRODUCT} >
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link href={URL_SALE} >
                                Ventas
                            </Link>
                        </li>
                        <li>
                            <Link href={URL_SALE_HISTORY} >
                                Historial De Ventas
                            </Link>
                        </li>
                        <li>
                            <Link href={URL_INVOICE} >
                                Proformas
                            </Link>
                        </li>
                        <li>
                            <Link href={URL_INVOICE_HISTORY} >
                               Historial de Proformas
                            </Link>
                        </li>
                        <li>
                            <Link href={URL_PROFILE} >
                                Profile
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}
