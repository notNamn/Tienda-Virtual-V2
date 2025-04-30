"use server";
import { URL_BASE } from "@/model/proyect";
import { Message } from '../model/Entities';
import { deleteCookieToken, saveCookieToken } from "./CookieService";

const URL_SIGNIN = URL_BASE + "/api/authentication/sign-in";
const URL_SIGNUP = URL_BASE + "/api/authentication/sign-up";


export async function logoutUser(){
    await deleteCookieToken();
}

export async function signInUser(user: { username: string; password: string }) {
    try {
        const response = await fetch(`${URL_SIGNIN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        // Manejo de errores HTTP explícito
        if (!response.ok) {
            const errorResponse = await response.json();
            return {
                isError: true,
                ...errorResponse
            };
        }

        const data: Message = await response.json();
        
        if (data.details == null) {
            return {
                isError: true,
                message: "No se recibió token",
            };
        }

        await saveCookieToken(data.details);;

        return {
            ...data,
            isError: false
        };

    } catch (error: any) {
        console.error("Error de red o servidor:", error);
        return {
            isError: true,
            message: "No se pudo conectar al servidor",
            details: error.message
        };
    }
}


export async function createAccountUser(user: { username: string; password: string }){
    try{
        const response = await fetch(`${URL_SIGNUP}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return {
                isError: true,
                ...errorResponse
            };
        }

        const data: Message = await response.json();

        if (data.details == null) {
            return {
                isError: true,
                message: "No se recibió token",
            };
        }

        return {
            ...data,
            isError: false
        };
    }catch(error : any){
        console.error("Error de red o servidor:", error);
        return {
            isError: true,
            message: "No se pudo conectar al servidor",
            details: error.message
        };
    }

}