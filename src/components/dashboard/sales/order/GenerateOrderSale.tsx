"use client";
import { useShoppingCartStore } from '@/store/ShoppingCartStore';
import React, { useState } from 'react'
import ProductsInCart from '../../cart/ProductsInCart';
import { FaShopify } from 'react-icons/fa';
import Link from 'next/link';
import FormCustomer from '../../customer/FormCustomer'; 
import { useCustomerStore } from '@/store/CustomerStore';
import { createOrder, addMultipleProductsToOrder, processOrder } from '@/service/SaleService';
import { Customer } from '@/model/Entities';
import { useRouter } from 'next/navigation';

export default function GenerateOrderSale() {
    // OBTENER EL CARRITO DE COMPRAS DEL STORE
    const getShoppingCart = useShoppingCartStore(state => state.cart);
    const clearCart = useShoppingCartStore(state => state.clearCart);
    const route = useRouter();
    // DATOS DEL CUSTOMER 
    const customer = useCustomerStore(state => state.customer);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleGenerateOrden = async () => {
        try {
            setIsLoading(true);
            console.log("customer del formulario", { customer });
            console.log("Carrito de compras", { getShoppingCart });

            // Verificar si hay productos en el carrito
            if (getShoppingCart.length === 0) {
               // toast.error("No hay productos en el carrito");
               console.log("No hay productos en el carrito")
                return;
            }

            // Verificar si hay datos del cliente
            if (!customer.firstName || !customer.lastName) {
                // toast.error("Debe ingresar los datos del cliente");
                console.log("Debe ingresar los datos del cliente")
                return;
            }

            // 1. Crear la orden
            const newOrder = await createOrder();
            if (!newOrder) {
                // toast.error("Error al crear la orden");
                console.log("Error al crear la orden")
                return;
            }

            // 2. Preparar los productos para agregar a la orden
            const orderItems = getShoppingCart.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }));

            // 3. Agregar los productos a la orden
            const result = await addMultipleProductsToOrder(orderItems);
            if (!result || result.length === 0) {
               // toast.error("Error al agregar productos a la orden");
               console.log("Error al agregar productos a la orden")
                return;
            }

            // 4. Procesar la orden con los datos del cliente
            const customerData: Customer = {
                firstName: customer.firstName,
                lastName: customer.lastName,
                phoneNumber: customer.phoneNumber ? Number(customer.phoneNumber): 0,
                carnet: customer.carnet ? Number(customer.carnet) : 0,
            };
            const sale = await processOrder(customerData);
            
            if (sale) {
                //toast.success("Orden generada correctamente");
                alert("Orden generada correctamente")
                console.log("Orden generada correctamente")
                clearCart(); // Limpiar el carrito después de procesar la orden
                // Aquí podrías redirigir a una página de confirmación o mostrar los detalles de la venta
                route.push(`/dashboard/sales/view/${sale.id}`);
            } else {
                //toast.error("Error al procesar la orden");
                console.log("Error al procesar la orden")
            }
        } catch (error) {
            console.error("Error al generar la orden:", error);
           // toast.error("Ocurrió un error al generar la orden");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-4' >
            {/* DATOS DEL CLIENTE */}
            <div className='col-span-2 bg-white rounded-lg shadow-md p-4' >
                <h2 className='text-2xl font-bold mb-4' >
                    Datos del Cliente
                </h2>
                <FormCustomer />
            </div>

            {/* CARRITO DE COMPRAS */}
            <div className='bg-white rounded-lg shadow-md p-4 flex flex-col max-h-[calc(100vh-100px)]' >
                <Link
                    href={'/dashboard/sales'}
                    className='text-blue-500 hover:text-blue-700 mb-4 cursor-pointer'
                >
                    Agregar mas productos
                </Link>

                <h2 className='text-2xl font-bold mb-4' >
                    Generar Orden de Venta
                </h2>

                <ProductsInCart />

                <div className="pt-4 mt-auto">
                    <button
                        className={`w-full ${isLoading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}
                            text-white font-bold py-3 px-6 rounded-lg shadow-md 
                            transition-colors duration-300 flex items-center justify-center cursor-pointer`}
                        onClick={handleGenerateOrden}
                        disabled={isLoading}
                    >
                        <FaShopify size={20} className="mr-2" />
                        {isLoading ? 'PROCESANDO...' : 'GENERAR ORDEN'}
                    </button>
                </div>
            </div>
        </div>
    )
}
