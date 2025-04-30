import TableProducts from '@/components/dashboard/products/TableProducts'
import { getAllCategories } from '@/service/CategoryService';
import { getAllProducts } from '@/service/ProductService'
import React from 'react'

export default async function pageProducts() {
    const productos = await getAllProducts();
    const categories = await getAllCategories();

  return (
    <>
        <TableProducts productos={productos!} categories={categories} />
    </>
  )
}

