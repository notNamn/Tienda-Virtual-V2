'use client';

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import SalePdf from './SalePdf';
import { Sale } from '@/model/Entities';
import { FaFilePdf } from 'react-icons/fa';

type buttonSaleProps = {
  sale: Sale;
}

export default function ButtonExportPdfSale({ sale }: buttonSaleProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExportPdf = async () => {
    try {
      setIsGenerating(true);

      // Verificar que los datos de venta existan
      if (!sale) {
        console.error('No hay datos de venta disponibles');
        alert('Error: No hay datos de venta para generar el PDF');
        return;
      }

      // Generar el PDF
      const blob = await pdf(<SalePdf sale={sale} />).toBlob();

      // Crear URL para descarga
      const url = URL.createObjectURL(blob);

      // Crear y activar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = `factura-${sale.id || 'nueva'}.pdf`;
      document.body.appendChild(link); // Importante en algunos navegadores
      link.click();

      // Limpiar recursos
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      console.log('PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Error al generar el PDF. Por favor, intente nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
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
    </>
  );
}
