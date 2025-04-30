import React from "react";


export interface LayoutProps {
    children: React.ReactNode;
}





export const URL_BASE: string = "http://localhost:8080";

// IGV
export const IGV: number = 0.18;

// URL DEN REDIRECCION  
export const URL_HOME: string = "/dashboard/home";
export const URL_PRODUCT: string = "/dashboard/products";
export const URL_INVOICE: string = "/dashboard/invoices";
export const URL_INVOICE_HISTORY: string = "/dashboard/invoices/history";
export const URL_SALE: string = "/dashboard/sales";
export const URL_SALE_HISTORY: string = "/dashboard/sales/history";
export const URL_PROFILE: string = "/dashboard/profile";