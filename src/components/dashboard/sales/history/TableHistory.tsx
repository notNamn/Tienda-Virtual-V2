import ButtonExportPdfSale from '@/components/exportPdf/ButtonExportPdfSale';
import { Sale } from '@/model/Entities';
import Link from 'next/link';
import React from 'react';
import { FaEye } from 'react-icons/fa';

const encabezadoTabla = ["Id", "Productos Comprados", "Total de venta", "Nombre del cliente", "Fecha", "Acciones"];

type TableHistoryProps = {
    salesHistories: Sale[];
}

export default function TableHistory({ salesHistories }: TableHistoryProps) {
    return (
        <div className=" rounded-xl shadow-md overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Historial de Ventas
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Todas las ventas realizadas
                        </p>
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
                        {/* Table Rows */}
                        {salesHistories.map((sale) => (
                            <tr
                                key={sale.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {sale.order.count_product}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {sale.total}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {sale.customer.firstName} {sale.customer.lastName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                        {sale.createdAt.toString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                        <Link 
                                            className="flex items-center justify-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors duration-200 font-medium text-sm"
                                            href={`/dashboard/sales/view/${sale.id}`} 
                                        >
                                            <FaEye className="text-sm" />
                                            Ver
                                        </Link>
                                        <div>
                                            <ButtonExportPdfSale key={sale.id} sale={sale} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
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
