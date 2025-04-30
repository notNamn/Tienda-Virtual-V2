"use server";
import { JwtPayload, Seller } from "@/model/Entities";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const COOKIE_TOKEN_NAME = "token"; 
const COOKIE_SELLER = 'seller';

// TOKEN
export async function saveCookieToken(token: string) {
  (await cookies()).set(COOKIE_TOKEN_NAME, token, {
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export async function getCookieToken() {
  return (await cookies()).get(COOKIE_TOKEN_NAME)?.value;
}

export async function deleteCookieToken() {
  (await cookies()).delete(COOKIE_TOKEN_NAME);
}

export async function getCookieDecodedToken() {
  try {
    const token = await getCookieToken();
    if (!token) {
      console.error("No token found in cookies");
      return null;
    }
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

// SELLER
export async function saveCookieSeller(seller: Seller) {
  (await cookies()).set(COOKIE_SELLER, JSON.stringify(seller), {
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export async function getCookieSeller() {
  const seller = (await cookies()).get(COOKIE_SELLER)?.value;
  return seller ? JSON.parse(seller) as Seller : null;
}