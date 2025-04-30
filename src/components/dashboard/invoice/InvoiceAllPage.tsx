"use client";
import { Product } from '@/model/Entities'
import { useShoppingCartStore } from '@/store/ShoppingCartStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import ProductsInCart from '../cart/ProductsInCart';
import { createInvoiceOrder } from '@/service/InvoiceService';

type InvoiceAllPageProps = {
    products: Product[];
}

export default function InvoiceAllPage({ products }: InvoiceAllPageProps) {

    const [searchTerm, setSearchTerm] = useState("");

    const productFilter = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    //carrito de compras
    const addProductToCart = useShoppingCartStore((state) => state.addProductToCart);

    const router = useRouter();

    //btn de crear orden
    const handleCreateOrder = async () => {
        if (addProductToCart === null) {
            alert('No hay productos en el carrito');
            return;
        }
        const response = await createInvoiceOrder();
        console.log({ response });
        router.push('/dashboard/invoices/order');
    }
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
                {/* BUSCADOR  */}
                <div className="mb-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* LISTA DE PRODUCTOS  */}
                <div>
                    {productFilter.length === 0 ? (
                        <div className="flex justify-center items-center h-40">
                            <p className="text-gray-500">
                                No hay productos que coincidan con la búsqueda
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Categoría
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Precio
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acción
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {productFilter.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {product.category.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    ${product.price.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {product.stock}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                                    onClick={() => addProductToCart({ product: product, quantity: 1 })}
                                                >
                                                    Agregar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {/* CARRITO DE COMPRAS */}
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col max-h-[calc(100vh-100px)]">
                <ProductsInCart />

                <div className="pt-4 mt-auto">
                    <button
                        className="w-full bg-green-600 hover:bg-green-700
                text-white font-bold py-3 px-6 rounded-lg shadow-md 
                transition-colors duration-300 flex items-center justify-center cursor-pointer"
                        onClick={() => handleCreateOrder()}
                    >
                        <FaCheck size={20} />
                        CONTINUAR
                    </button>
                </div>
            </div>

        </div>
    )
}
