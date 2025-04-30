"use client";
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { Sale } from '@/model/Entities';

// Estilos similares a Tailwind usando StyleSheet de react-pdf
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  invoiceInfo: {
    textAlign: 'right',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  table: {
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableCell: {
    width: '25%',
    paddingRight: 8,
  },
  rightAlign: {
    textAlign: 'right',
  },
  totalSection: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingTop: 10,
  },
});

type SateItemPdf = {
   sale : Sale; 
}

export default function SalePdf({sale}: SateItemPdf) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image style={styles.logo} src="https://tailwindflex.com/public/images/logos/favicon-32x32.png" />
            <Text> Tienda Virtual</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.boldText}>
                BOLETA DE VENTA
            </Text>
            <Text>Date: {sale.createdAt.toString()}  </Text>
            <Text>Invoice #: INV_{sale.id} </Text>
          </View>
        </View>

        {/* Customer  */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Bill To:</Text>
          <Text>Nombre : {sale.customer.firstName}, {sale.customer.lastName} </Text>
          <Text>DNI: {sale.customer.carnet} </Text>
          <Text>Telefono: {sale.customer.phoneNumber} </Text>
          <Text>johndoe@example.com</Text>
        </View>

        {/* Orden de productos */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Producto</Text>
            <Text style={styles.tableCell}>Cantidad</Text>
            <Text style={styles.tableCell}>Precio</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {sale.order?.orderDetails.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.tableCell}>{item.product?.title || 'Producto'}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{(item.product?.price || 0).toFixed(2)}</Text>
              <Text style={styles.tableCell}>{(item.subtotal || 0).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Subtotal / Tax / Total */}
        <View style={styles.totalSection}>
          <Text>Cabtidad de productos: ${sale.order.count_product} </Text>
          <Text>Subtotal: ${sale.subtotal} </Text>
          <Text>Tax: ${(sale.IGV*(sale.subtotal)).toFixed(2)} </Text>
          <Text style={styles.totalText}>Subtotal: S/ {(sale.subtotal || 0).toFixed(2)}</Text>
          <Text style={styles.totalText}>IGV (18%): S/ {((sale.IGV || 0) * (sale.subtotal || 0)).toFixed(2)}</Text>
          <Text style={styles.totalText}>Total: S/ {(sale.total || 0).toFixed(2)}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Atendido por : {sale.seller.firstName}, {sale.seller.lastName}  </Text>
          <Text>Direccion: {sale.seller.shopAddress} </Text>
          <Text>Telefono: {sale.seller.phoneNumber} </Text>
          <Text> *Payment is due within 30 days. Late payments are subject to fees.</Text>
          <Text> *Please make checks payable to Your Company Name and mail to:</Text>
        </View>
      </Page>
    </Document>
  );
}
