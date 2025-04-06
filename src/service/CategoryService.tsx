import { Category } from "@/model/Entities";
import { URL_BASE } from "@/model/proyect";

const URL_CATEGORY: string = URL_BASE + "/category";

export async function getAllCategories(){
    try{
        const data = await fetch(URL_CATEGORY, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const response = await data.json();
        //console.log(response)
        return response as Category[];
    }catch(error){
        console.log(error);
        return [] as Category[];
    }
}

export async function getProductsByCategory(name: string){
    try{
        const data = await fetch(`${URL_CATEGORY}/name/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const response = await data.json();
        return response as Category;
    }catch(error){
        console.log(error);
        return {} as Category;
    }
}