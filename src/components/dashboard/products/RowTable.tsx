"use client";
import React from 'react'
import { Product } from '../../../model/Entities';

type RowTableProps = {
    producto: Product
    children?: React.ReactNode
}

export default function RowTable({ producto, children }: RowTableProps) {
    return (
        <tr 
            key={producto.id} 
            className="hover:bg-gray-50 transition-colors duration-150"
        >
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src={producto.imageUrl} 
                        alt={producto.title} 
                    />
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {producto.title}
                        </div>
                        <div className="text-sm text-gray-500">
                            {producto.description}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {producto.category.name}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {producto.price}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                    {producto.stock}
                </span>
            </td>

            <td className=" whitespace-nowrap text-left text-sm font-medium">
                  {children}  
            </td>
        </tr>
    )
}
