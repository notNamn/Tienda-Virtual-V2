import { URL_BASE } from "@/model/proyect";
import { fetchHelper } from "./FetchHelper";
import { getCookieDecodedToken } from "./CookieService";
import { Invoice, Sale } from "@/model/Entities";

const URL_HISTORY = URL_BASE + "/seller/history";

export async function getHistorySales(){
    try {
        const token = await getCookieDecodedToken();
        const data = await fetchHelper(`${URL_HISTORY}/sales/${token?.userId}`, {
            method: "GET",
        });
        if(!data){
            throw new Error("Error al obtener el historial de compras"); 
        }
        return data as Sale[];
    }catch(e){
        console.log(e);
        return [];
    }
}

export async function getHistoryInvoices(){
    try {
        const token = await getCookieDecodedToken();
        const data = await fetchHelper(`${URL_HISTORY}/invoices/${token?.userId}`, {
            method: "GET",
        });
        if(!data){
            throw new Error("Error al obtener el historial de compras"); 
        }
        return data as Invoice[];
    }catch(e){
        console.log(e);
        return [];
    }
}