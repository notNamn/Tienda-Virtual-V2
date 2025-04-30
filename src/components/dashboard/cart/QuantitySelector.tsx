"use client";
import React from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import { useShoppingCartStore } from '@/store/ShoppingCartStore';
import { Product } from '@/model/Entities';

type QuantitySelectorProps = {
    product: Product;
    quantity: number;
};

export default function QuantitySelector({ product, quantity}: QuantitySelectorProps) {
    const updateQuantity = useShoppingCartStore(state => state.updateQuantityToProduct);
    const removeProduct = useShoppingCartStore(state => state.removeProductToCart);
    const handleDecrease = () => {
        if (quantity > 1) {
            updateQuantity( product, quantity - 1);
        }else{
            removeProduct(product); 
        }

    }
    const handleIncrease = () => {
        if (quantity < product.stock) {
            updateQuantity( product, quantity + 1);
        } 
    }
  return (
    <div className="flex">
            <button className='cursor-pointer'  onClick={handleDecrease}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center">
                {quantity}
            </span>
            <button className='cursor-pointer'  onClick={handleIncrease}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
  )
}

