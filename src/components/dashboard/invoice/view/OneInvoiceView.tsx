import BtnExportPdfInvoice from '@/components/exportPdf/BtnExportPdfInvoice';
import { Invoice } from '@/model/Entities'
import { formatCurrency, formattedDate } from '@/utils/formatters';
import React from 'react'

type OneInvoiceViewProps = {
  invoice: Invoice;
}

export default function OneInvoiceView({invoice}:OneInvoiceViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
      {/* Header section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <img className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png" alt="Logo" />
          <div className="text-gray-700 font-semibold text-lg">Tienda Virtual</div>
        </div>
        <div className="text-gray-700">
          <div className="font-bold text-xl mb-2">FACTURA</div>
          <div className="text-sm">Fecha: {formattedDate(invoice.createdAt.toString())}</div>
          <div className="text-sm">Factura #: {invoice?.id || 'N/A'}</div>
        </div>
      </div>

      {/* Customer section */}
      <div className="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Cliente:</h2>
        <div className="text-gray-700 mb-2">{invoice?.customer?.firstName || ''} {invoice?.customer?.lastName || ''}</div>
        <div className="text-gray-700 mb-2">Teléfono: {invoice?.customer?.phoneNumber || 'N/A'}</div>
        <div className="text-gray-700 mb-2">Carnet: {invoice?.customer?.carnet || 'N/A'}</div>
      </div>

      {/* Products table */}
      <table className="w-full text-left mb-8">
        <thead>
          <tr>
            <th className="text-gray-700 font-bold uppercase py-2">Descripción</th>
            <th className="text-gray-700 font-bold uppercase py-2">Cantidad</th>
            <th className="text-gray-700 font-bold uppercase py-2">Precio</th>
            <th className="text-gray-700 font-bold uppercase py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice?.order?.orderDetails && invoice.order.orderDetails.length > 0 ? (
            invoice.order.orderDetails.map((item) => (
              <tr key={item.id}>
                <td className="py-4 text-gray-700">{item.product?.title || 'Producto'}</td>
                <td className="py-4 text-gray-700">{item.quantity}</td>
                <td className="py-4 text-gray-700">{formatCurrency(item.product?.price || 0)}</td>
                <td className="py-4 text-gray-700">{formatCurrency(item.subtotal || 0)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-gray-700 text-center">No hay productos en esta orden</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals section */}
      <div className="flex justify-end mb-2">
        <div className="text-gray-700 mr-2">Subtotal:</div>
        <div className="text-gray-700">
          {formatCurrency(invoice?.subtotal || 0)}
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <div className="text-gray-700 mr-2">IGV (18%):</div>
        <div className="text-gray-700">
          {formatCurrency((invoice?.IGV || 0) * (invoice?.subtotal || 0))}
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Total:</div>
        <div className="text-gray-700 font-bold text-xl">
          {formatCurrency(invoice?.total || 0)}
        </div>
      </div>

      {/* Footer section */}
      <div className="border-t-2 border-gray-300 pt-8 mb-8">
        <div className="text-gray-700 mb-2">El pago debe realizarse dentro de los 30 días. Los pagos tardíos están sujetos a cargos.</div>
        <div className="text-gray-700 mb-2">Por favor, haga los cheques pagaderos a Tienda Virtual y envíelos a:</div>
        <div className="text-gray-700">Av. Principal 123, Ciudad, País</div>
      </div>

      {/* PDF Export button - only render if invoice data exists */}
      {invoice && <BtnExportPdfInvoice invoice={invoice} />}
    </div>
  )
}
