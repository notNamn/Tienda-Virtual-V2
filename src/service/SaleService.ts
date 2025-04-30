
import { IGV, URL_BASE } from "@/model/proyect";
import { fetchHelper } from "./FetchHelper";
import { Message, Order, Sale } from "@/model/Entities";
import { Customer } from '../model/Entities';
import { getSeller } from "./SellerService";

const URL_SALE = URL_BASE + "/order/sale";

const saveOrderId = (orderId: number) => {
    localStorage.setItem("orderId", orderId.toString());
}

const getOrderId = () => {
    const orderId = localStorage.getItem("orderId");
    return orderId ? parseInt(orderId) : null;
}
const cleamOrderId = () => {
    localStorage.removeItem("orderId"); 
}

export async function getSaleById(saleId: number){
    try{
        const data = await fetchHelper(`${URL_SALE}/${saleId}`, {
            method: "GET",
        });
        return data as Sale; 
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function createOrder(){
    try{
        const data = await fetchHelper(`${URL_SALE}/create`, {
            method: "POST", 
        });
       // console.log({data});
        if(getOrderId()){ // para limpiar la orden si ya habia una creada
            cleamOrderId();
        }
        saveOrderId(data.id);
        return data as Order ;
    }catch(e){
        console.log(e);
        return [];
    }
}

// señaa qeu es un array 
export async function addProductToOrder
    (productId: number, quantity: number){
    try{
        const orderId = getOrderId();
        if(!orderId) {
            throw new Error("No hay orden");
        }

        const url = `${URL_SALE}/add/${orderId}?productId=${productId}&quantity=${quantity}`;
        const data = await fetchHelper(url, {
            method: "POST",
        });
        return data as Order;
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function addMultipleProductsToOrder
    (order: { productId: number, quantity: number }[]){
    const results = [];
    try{
        for(const item of order){
            const response = await addProductToOrder( item.productId, item.quantity);
            results.push(response);
        }
        //console.log({results});
        // retrono el ultimo resultado
        // posible solucion results[results.length - 1] 
        return results;
    }catch(e){
        console.log(e);
        return [];
    }
    
}

export async function deleteOrder(orderId: number){
    try{
        const url = `${URL_SALE}/delete/${orderId}`;
        const data = await fetchHelper(url, {
            method: "DELETE",
        });
        if(data) cleamOrderId(); 
        return data as Message;
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function processOrder ( customer: Customer){       
    try{
        // id order
        const orderId = getOrderId();
        if(!orderId) {
            throw new Error("No hay orden");
        }    
        // seller 
        const seller = await getSeller();
        if(!seller) {
            throw new Error("No hay vendedor");
        }

        const url = `${URL_SALE}/process/${orderId}?carnetSeller=${seller.carnet}&IGV=${IGV}`;
        const data = await fetchHelper(url, {
            method: "POST",
            body: JSON.stringify(customer), 
        });
        console.log({data})
        if(data) cleamOrderId();
        return data as Sale;
    }catch(e){
        console.log(e);
        return null; 
    }
}