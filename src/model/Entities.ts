export interface User {
    id: number;
    username: string;
    password: string;
    role: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: {
        name: string
    }
}

// products.category  :  NO VIENE DE LA API  
export interface Category {
    id: number;
    name: string;
    products: Product[];
}

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    carnet: number;
}

export interface OrderDetail{
    id: number;
    product: Product;
    quantity: number;
    subtotal: number;
    order: Order;
}

export interface Order {
    id: number;
    totalOrder: number;
    orderDetails: OrderDetail[];
}

export interface Seller {
    id: number;
    firstName: string;
    lastName: string;
    shopAddress: string;
    carnet: number;    
    phoneNumber: number;
}

export interface Invoice{
    id: number;
    seller: Seller;
    customer: Customer;
    order: Order;
    totalInvoice: number;
    subtotal: number;
    IGV: number;
    total: number;
    createdAt: Date;
}