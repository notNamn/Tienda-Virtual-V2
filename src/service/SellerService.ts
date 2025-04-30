"use server";
import { Seller } from "@/model/Entities";
import { URL_BASE } from "@/model/proyect";
import { fetchHelper } from "./FetchHelper";
import { getCookieDecodedToken, saveCookieSeller } from "./CookieService";

const  getUsernameByCookie = async () => {
    const tokenDecoded = await getCookieDecodedToken();
    console.log("TOKEN DECODED", {tokenDecoded});
    const username = tokenDecoded!.sub;
    return username;
}

const URL_SELLER = URL_BASE + "/seller";

export async function registerSeller (seller: Seller){
    try {
        const username = await getUsernameByCookie();
        const data = await fetchHelper(`${URL_SELLER}/${username}`, {
            method: "POST",
            body: JSON.stringify(seller),
        });
        if(!data){
            throw new Error("Error al registrarse");
        }
        await saveCookieSeller(data);
        
        return data as Seller;
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function getSeller(){
    const username = await getUsernameByCookie();
    console.log("USERNAME", username);
    try {
        const data = await fetchHelper(`${URL_SELLER}/${username}`, {
            method: "GET",
        });
        console.log(" GET SELLER BY BACKEND ", data)
        if(!data){
            throw new Error("Error al obtener el vendedor"); 
        }
        
        return data as Seller;
    }catch(e){
        console.log(e);
        return null;
    }
}