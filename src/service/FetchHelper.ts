"use server";

import { getCookieToken } from "./CookieService";

export async function fetchHelper(url: string, options: RequestInit = {}) {
    const token =await getCookieToken();

    const headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
        const res = await fetch(url, {
            ...options,
            headers,
        });
        console.log("RESPUES DEL BACKEND", {res})
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error al hacer fetch:", res.status, errorText);
            throw new Error(`Error en la petición: ${res.status}`);
        }
        // console.log("URL:", url);
        // console.log("Headers:", headers);
        // console.log("Options:", options);

        return await res.json();
    } catch (e) {
        console.error("Error general en fetchHelper:", e);
        throw e;
    }
}
/**
 * 
 * 
 * Con .cors(withDefaults()), 
 * Spring Security ahora debería usar la configuración d
 *  .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() es una capa extra de seguridad para asegurar que las OPTIONS no sean bloqueadas antes de que se aplique la configuración CORS.

 */