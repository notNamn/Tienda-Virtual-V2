"use client";

import { Customer } from "@/model/Entities";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CustomerState {
    customer: Partial<Customer>;
    setCustomer: (data: Partial<Customer>) => void;
    updateCustomer: (data: Partial<Customer>) => void;
    clearCustomer: () => void;
}

export const useCustomerStore = create<CustomerState>()(
    persist(
        (set) => ({
            customer: {},
            setCustomer: (data) => {
                set({ customer: data });
            },
            updateCustomer: (data) => {
                set((state) => ({ customer: { ...state.customer, ...data } }));
            },
            clearCustomer: () => {
                set({ customer: {} });
            }
        }), 
        {
            name: "customer-storage",
        }
    )
);