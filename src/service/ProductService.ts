"use server";
import { Product } from "@/model/Entities";
import { URL_BASE } from "@/model/proyect";

const URL_PRODUCT: string = URL_BASE + "/product";

export async function getAllProducts() {
    try {
        const data = await fetch(URL_PRODUCT, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = await data.json();
        return response as Product[];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getProductByTitle(title: string) {
    try {
        const data = await fetch(`${URL_PRODUCT}/title/${title}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const response = await data.json();
        return response as Product[];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function createProduct(product: Product) {
    try {
        const data = await fetch(`${URL_PRODUCT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        const response = await data.json();
        return response as Product;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function updateProduct(id: number, product: Product) {
    try {
        const data = await fetch(`${URL_PRODUCT}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        const response = await data.json();
        return response as Product;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteProduct(id: number) {
    try {
        const data = await fetch(`${URL_PRODUCT}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const response = await data.json();
        return response;
    } catch (e) {
        console.log(e);
        return null;
    }
}