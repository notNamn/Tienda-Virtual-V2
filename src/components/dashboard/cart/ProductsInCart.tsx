"use client";
import { useShoppingCartStore } from '@/store/ShoppingCartStore';
import React from 'react'
import QuantitySelector from './QuantitySelector'; 

export default function ProductsInCart() {

    const productInCart = useShoppingCartStore(state => state.cart);

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">Carrito de compras</h2>
            <div className="border-t border-gray-200 pt-4 flex flex-col h-full">
                {productInCart.length === 0? (
                    <p className="text-gray-500 text-center">No hay productos en el carrito</p>
                ):(
                    <>
                        {/* Scrollable container for products */}
                        <div className="overflow-y-auto max-h-[calc(100vh-300px)] ">
                            {
                                productInCart.map((item) => (
                                    <div key={item.product.id} 
                                        className="flex items-center space-x-4 mb-4 ">
                                        <img 
                                            src={item.product.imageUrl} 
                                            alt={item.product.title} 
                                            className="w-16 h-16 object-cover rounded" 
                                        />
                                        <div>
                                            <h3 className="text-sm font-semibold">
                                                {item.product.title}
                                            </h3>
                                            <p className="text-gray-500">
                                                ${item.product.price}
                                            </p>
                                        </div>
                                        <div>
                                            <QuantitySelector product={item.product} quantity={item.quantity} />
                                        </div>
                                    </div>  
                                ))
                            }
                        </div>
                        {/* Fixed total summary */}
                        <div className="mt-auto pt-2 border-t border-gray-200">
                            <p className="text-gray-500 text-right font-semibold">
                                Total: ${productInCart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
