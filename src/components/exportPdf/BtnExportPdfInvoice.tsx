"use client";
import { Invoice } from '@/model/Entities'
import {  pdf } from '@react-pdf/renderer';
import React, { useState } from 'react'
import InvoicePdf from './InvoicePdf';
import { FaFilePdf } from 'react-icons/fa';

type BtnInvoiceProps = {
    invoice: Invoice;
}

export default function BtnExportPdfInvoice({ invoice }: BtnInvoiceProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const handleExportPdf = async () => {
        try {
            setIsGenerating(true);
            if (!invoice) {
                alert("No hay datos de la factura")
                return;
            }
            // egnerar el pdf 
            const blob = await pdf(<InvoicePdf invoice={invoice} />).toBlob();
            // crear la ulr para descargar 
            const url = URL.createObjectURL(blob);
            // crear y activar descartga
            const link = document.createElement("a");
            link.href = url;
            link.download = `invoice_${invoice.id || "nuevo"}.pdf`;
            link.click();

            // limpiar 
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);

        } catch (e) {
            console.log("Error al generar el PDF", e)
            alert("Error al generar el PDF")
        } finally {
            setIsGenerating(false)
        }
    }
    return (
        <button
            onClick={handleExportPdf}
            disabled={isGenerating}
            className={`cursor-pointer flex items-center justify-center 
          gap-2 ${isGenerating ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white 
          font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300`}
        >
            <FaFilePdf className="text-xl" />
            {isGenerating ? 'Generando...' : 'Exportar PDF'}
        </button>
    )
}
