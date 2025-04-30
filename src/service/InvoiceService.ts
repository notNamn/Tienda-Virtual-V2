import { IGV, URL_BASE } from "@/model/proyect";
import { fetchHelper } from "./FetchHelper";
import { Customer, Invoice, Message } from "@/model/Entities";
import { getSeller } from "./SellerService";

const URL_INVOICE = URL_BASE + "/order/invoice";

// GUARDAR EN EL LOCALSTORAGE
const saveStorageInvoiceId = (invoiceId: number) => {
    localStorage.setItem("invoiceId", invoiceId.toString());
}

const getStorageInvoiceId = () => {
    const invoiceId = localStorage.getItem("invoiceId");
    return invoiceId? parseInt(invoiceId) : null;
}

const cleamStorageInvoiceId = () => {
    localStorage.removeItem("invoiceId");
}

//
export async function getInvoiceById(invoiceId: number){
    try{
        const data = await fetchHelper(`${URL_INVOICE}/${invoiceId}`, {
            method: "GET",
        });
        return data as Invoice;
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function createInvoiceOrder(){
    try{
        const data = await fetchHelper(`${URL_INVOICE}/create`,{
            method: "POST",
        });
        saveStorageInvoiceId(data.id);
        return data as Invoice;
    }catch(e){
        console.log(e);
        return [];
    }
}

export async function addProductToInvoiceOrder(productId: number, quantity: number){
    try{
       const invoiceId = getStorageInvoiceId();
       if(invoiceId){
        throw new Error("No hay orden Invoice creada");
       } 

       const url = `${URL_INVOICE}/add/${invoiceId}?productId=${productId}&quantity=${quantity}`;
       const data = await fetchHelper(url, {
            method: "POST",
       });
       return data as Invoice;
    }catch(e){
        console.log(e);
        return null;       
    }
}

export async function addMultipleProductToInvoice(order: {productId: number, quantity: number}[]){
    try{
        const result = [];
        for(const item of order){
            const response = await addProductToInvoiceOrder(item.productId, item.quantity);
            result.push(response);
        }
        return result;
    }catch(e){
        console.log(e);
        return [];
    }
}

export async function deleteInvoiceOrder(invoiceId: number){
    try{
       const url = `${URL_INVOICE}/delete/${invoiceId}`;
       const data = await fetchHelper(url, {
            method: "DELETE",
       });
       if(data) {
            cleamStorageInvoiceId();
       }
       return data as Message;
    }catch(e){
        console.log(e);
        return null; 
    }
}


export async function processInvoiceOrder(customer: Customer){
    try{
        const invoiceId = getStorageInvoiceId();
        if(!invoiceId){
            throw new Error("No hay orden Invoice creada");
        }

        // seller
        const seller = await getSeller();
        if(!seller){
            throw new Error("No hay seller");
        }

        const url = `${URL_INVOICE}/process/${invoiceId}?carnetSeller=${seller.carnet}&IGV=${IGV}`;
        const data = await fetchHelper(url, {
            method: "POST",
            body: JSON.stringify(customer),
        });
        if(data){
            cleamStorageInvoiceId();
        }
        return data as Invoice;
    }catch(e){
        console.log(e);
        return null;
    }
}