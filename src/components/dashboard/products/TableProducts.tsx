"use client";
import { Category, Product } from '@/model/Entities';
import React, { useState } from 'react'
import RowTable from './RowTable';
import { AddProductModal } from './crud/AddProductModal';
import EditProductModal from './crud/EditProductModal';
import { ViewProduct } from './crud/ViewProduct';

const encabezadoTabla = ["Nombre", "Categoria", "Precio", "Stock", "Acciones"];

type TableProductsProps = {
    productos: Product[],
    categories: Category[],
}

export default function TableProducts({ productos, categories }: TableProductsProps) {

    const category = categories.flatMap((category) => category.name);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const productsFilter = productos.filter((product) => {

        // Filtrar por la busqueda de nombre
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtrar por categoría seleccionada
        const matchesCategory = selectedCategory === "all" || product.category.name === selectedCategory;
        // Retornar true solo si cumple ambas condiciones
        return matchesCategory && matchesSearch;
    });


    if (productos.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">No hay productos disponibles.</p>
            </div>
        );
    }

    return (
        <div className=" rounded-xl shadow-md overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Admistracion de productos
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Administra todos los productos disponibles aqui.
                        </p>
                    </div>
                    {/* ADD PRODUCT  */}
                    <div className="mt-4 md:mt-0">

                        <AddProductModal categories={category} />
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    {/* Buscadr de productos  */}
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full "
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* filtrado pro categoryies   */}

                    <div>
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-2  w-full sm:w-auto"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">All Departments</option>
                            {category.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {encabezadoTabla.map((heading) => (
                                <th
                                    key={heading}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {productsFilter.map((product) => (
                            <RowTable key={product.id} producto={product}>
                                <EditProductModal producto={product} categories={category} />
                                <ViewProduct producto={product} />
                                <a href="#" className="text-red-600 hover:text-red-900">
                                    Delete
                                </a>
                            </RowTable>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between flex-col sm:flex-row">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">24</span> results
                    </p>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {["Previous", "1", "2", "3", "...", "8", "9", "Next"].map((item, index) => (
                            <a
                                key={index} href="#"
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 ${item === "1" ? "bg-indigo-50 text-indigo-600" : "bg-white"}`}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
