"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { User } from "@/model/Entities"; // Asegúrate de que esta entidad esté bien definida
import { signInUser } from "@/service/LoginService";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<User>>({
        username: "",
        password: ""
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validar datos antes de enviar al servicio
        if (!formData.username || !formData.password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            // Llama a tu servicio de inicio de sesión
            const response = await signInUser(formData as User);
            console.log({ response }); // Log para debugging

            if (response?.isError && response.isError !== undefined) {
                alert("Ocurrió un error al registrarse.  Verifica tu correo y contraseña.");
            }

            // Limpia el formulario después de un inicio de sesión exitoso
            setFormData({
                username: "",
                password: ""
            });
            router.push("/dashboard/home");
        } catch (error) {
            console.error("Error al iniciar sesión:", error); // Log de error más detallado
            alert("Ocurrió un error al iniciar sesión. Inténtalo de nuevo más tarde.");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Actualización más limpia del estado
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 text-shadow-black">
            <div>
                <label  className="label block text-gray-700 mb-1">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="usuario"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black" 
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all font-semibold"
            >
                Ingresar
            </button>
            <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500">O</span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <Link
                href="/auth/new-account"
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md text-center hover:bg-gray-300 transition-all font-semibold"
            >
                Crear una nueva cuenta
            </Link>
        </form>
    );
}