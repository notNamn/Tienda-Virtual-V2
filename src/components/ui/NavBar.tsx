"use client";

import React from 'react';
import { ThemeSelector } from './ThemeSelector';
import Drawer from './Drawer';
import Link from 'next/link';
import { URL_HOME } from '@/model/proyect';
import { FiLogOut } from 'react-icons/fi';
import { logoutUser } from '@/service/LoginService';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const router = useRouter();
    
    const handleLogout = () => {
        logoutUser();
        router.push("/auth/login");
    }
    
    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50 shadow-sm">
            <div className="flex-1">
                <div className="navbar bg-base-100">
                    <div className="flex-none">
                        <Drawer />
                    </div>
                    <div className="flex-1">
                        <Link href={URL_HOME} className="btn btn-ghost text-xl">
                            Tienda Virtual
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex-none">
                <button 
                    className="btn btn-outline btn-error gap-2 mr-2 hover:bg-red-100"
                    onClick={handleLogout}                   
                >
                    <FiLogOut size={20} className="h-5 w-5" />
                    Salir
                </button>
                <ThemeSelector />
            </div>
        </div>
    );
}