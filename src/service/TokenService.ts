import { JwtPayload } from "@/model/Entities";
import { jwtDecode} from "jwt-decode";

/**
 * 
 *  @deprecated ya no usar
 * @description obtener token del local storage lo cual no es correcto 
 */
export const getToken = () => localStorage.getItem("token");


/**
 * @deprecated ya no usar 
 * @returns 
 */
export async function getDecodedToken () {
    const token = await getToken();
    if (!token) return null;
    
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
}
