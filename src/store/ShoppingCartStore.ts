"use client";

import { Product, ShoppingCart } from "@/model/Entities";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface EstadoCarrito {
    // atribute
    cart: ShoppingCart[];
    total: number;
    // metods
    addProductToCart: (shopping: ShoppingCart)=> void;
    updateQuantityToProduct: (shoppingProduct: Product, quantity: number) => void;
    removeProductToCart: (shoppingProduct: Product) => void;
    clearCart: () => void;
}

export const useShoppingCartStore = create<EstadoCarrito>()(
    persist(
        (set, get) =>({
            cart: [],
            total: 0,
            addProductToCart: (shopping: ShoppingCart)=>{
                const {cart} = get();
                // verificar si el producto ya existe en el carrito
                const productInCart = cart.some(
                    (item)=> item.product.id === shopping.product.id
                );
                
                if(!productInCart){
                    // Calcular el nuevo total
                    const newTotal = get().total + (shopping.product.price * shopping.quantity);
                    set({
                        cart: [...cart, shopping],
                        total: newTotal
                    });
                    return;
                }
                
                // si el producto ya existe en el carrito, actualizar la cantidad
                const newCart = cart.map((item)=> {
                    if (item.product.id === shopping.product.id) {
                        return {...item, quantity: item.quantity + shopping.quantity};
                    }
                    return item;    
                });
                
                // Recalcular el total
                const newTotal = newCart
                    .reduce(
                    (sum, item) => sum + (item.product.price * item.quantity), 
                    0
                );
                
                set({
                    cart: newCart,
                    total: newTotal
                });
            },
            updateQuantityToProduct: (shoppingProduct: Product, quantity: number) => {
                const {cart} = get();
                const updateCart = cart.map((item)=> {
                    if (item.product.id === shoppingProduct.id) {
                        return {...item, quantity: quantity};
                    }
                    return item;
                });
                const newTotal = updateCart.reduce(
                    (sum, item) => sum + (item.product.price * item.quantity),
                    0
                );
                set({
                    cart: updateCart,
                    total: newTotal
                });
            },
            removeProductToCart: (shoppingProduct: Product) => {
                const {cart} = get();
                const updateCart = cart.filter(
                    (item) => item.product.id !== shoppingProduct.id
                );
                const newTotal = updateCart.reduce(
                    (sum, item) => sum + (item.product.price * item.quantity),
                    0
                );
                set({
                    cart: updateCart,
                    total: newTotal 
                })
            },
            clearCart: () => {
                set({
                    cart: [],
                    total: 0
                })
            },     
        }), 
        {
            name: "shopping-cart-storage",
        }
    )
)